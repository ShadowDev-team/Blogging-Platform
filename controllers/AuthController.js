const Joi = require('joi');
const { Op } = require('sequelize');
const { User } = require('../models');
const passwordHash = require('../utils/passwordHash');

class AuthController {
    async register(req, res) {
        try {
            const {username, email, password} = req.body;

            // validate form inputs
            const schema = Joi.object({
                username: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
                email: Joi.string().email().required(),
                password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
            });
            const result = await schema.validate({username, email, password});

            if (result.error) {
                return res.status(400).send({ error: result.error.message });
            }

            // Check if user already exists
            const existingUser = await User.findOne({
                where: { [Op.or]: [{ email }, { username }], }
            });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create new user
            const hashedPassword = await passwordHash.hash(password);
            const user = await User.create({
                username,
                email,
                password: hashedPassword
            });

            res.status(201).json({
                message: 'User registered successfully',
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({message: 'An error occurred during registration'});
        }
    }

    async login(req, res) {
        try {
            const {login, password} = req.body;

            // Find user by email
            const user = await User.findOne({
                where: { [Op.or]: [{ email: login }, { username: login }], }
            });
            if (!user) {
                return res.status(401).json({message: 'Invalid credentials'});
            }

            // Validate password
            const isValidPassword = await passwordHash.check(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({message: 'Invalid credentials'});
            }

            // Add user info to session
            req.session.user = {id: user.id, username: user.username};

            res.json({
                message: 'Logged in successfully',
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({message: 'An error occurred during login'});
        }
    }

    async logout(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }

    async resetPassword(req, res) {
    }
}

module.exports = new AuthController();