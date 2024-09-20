const Joi = require('joi');
const {Op} = require('sequelize');
const {User} = require('../models');
const hashService = require('../services/hashService');
const mailService = require('../services/mailService');

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
                password: Joi
                    .string()
                    .pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'))
                    .required()
                    .messages({
                        'string.pattern.base': 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number',
                    })
            });
            const result = await schema.validate({username, email, password});

            if (result.error) {
                return res.status(400).send({error: result.error.message});
            }

            // Check if user already exists
            const existingUser = await User.findOne({
                where: {[Op.or]: [{email}, {username}],}
            });
            if (existingUser) {
                return res.status(400).json({message: 'User already exists'});
            }

            // Create new user
            const hashedPassword = await hashService.hash(password);
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
                where: {[Op.or]: [{email: login}, {username: login}],}
            });
            if (!user) {
                return res.status(401).json({message: 'Invalid credentials'});
            }

            // Validate password
            const isValidPassword = await hashService.check(password, user.password);
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
        try {
            const {email} = req.query;

            // validate form input
            const schema = Joi.object({
                email: Joi.string().email().required(),
            });
            const result = await schema.validate({email});

            if (result.error) {
                return res.status(400).send({error: result.error.message});
            }

            // Find user by email
            const user = await User.findOne({
                where: {email}
            });
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }

            // Generate reset token
            const resetToken = await hashService.generateResetToken();
            user.token = resetToken;
            await user.save();

            // Send email with reset link
            if (await mailService(email, resetToken)) {
                return res.status(200).json({message: 'Reset password link sent to email'});
            } else {
                return res.status(500).json({message: 'An error occurred during password reset'});
            }
        } catch (error) {
            console.error('Reset password error:', error);
            res.status(500).json({message: 'An error occurred during password reset'});
        }
    }

    async checkResetToken(req, res) {
        try {
            const {token} = req.query;

            // Find user by token
            const user = await User.findOne({
                where: {token}
            });
            if (!user) {
                return res.render('pages/error', {
                    layout: false,
                    message: 'Reset link is not valid or has expired.',
                    to: {
                        link: '/login',
                        text: 'Go to Login'
                    }
                });
            }

            // check token expiration time for 30 minutes
            const tokenTime = parseInt(token.split('-')[0]);
            const currentTime = new Date().getTime();
            if (currentTime - tokenTime > 30 * 60 * 1000) {
                return res.render('pages/error', {
                    layout: false,
                    message: 'Reset link is not valid or has expired.',
                    to: {
                        link: '/login',
                        text: 'Go to Login'
                    }
                });
            }

            res.render('pages/auth/new-password', {layout: false});
        } catch (error) {
            res.render('pages/error', {
                layout: false,
                message: 'An error occurred during password reset.',
                to: {
                    link: '/login',
                    text: 'Go to Login'
                }
            });
        }

    };

    async changePassword(req, res) {
        try {
            const {password} = req.body;
            const {token} = req.query;

            // validate form input
            const schema = Joi.object({
                password: Joi
                    .string()
                    .pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'))
                    .required()
            });
            const result = await schema.validate({password});

            if (result.error) {
                return res.status(400).send({error: result.error.message});
            }

            // Find user by token
            const user = await User.findOne({
                where: {token}
            });
            if (!user) {
                return res.status(404).json({message: 'Token is not valid'});
            }

            // Update user password
            user.password = await hashService.hash(password);
            user.token = null;
            await user.save();

            res.status(200).json({message: 'Password changed successfully'});
        } catch (error) {
            console.error('Change password error:', error);
            res.status(500).json({message: 'An error occurred during password change'});
        }
    }

    async me(req, res) {
        if (req.session.user) {
            res.json({message: "user is logged in"});
        } else {
            res.status(401).json({message: 'Unauthorized'});
        }
    }
}

module.exports = new AuthController();