const { User } = require("../models");
const { Article } = require("../models");
const { Comment } = require("../models");
const bcrypt = require('bcrypt');
const Joi = require('joi');  
const ArticleContoller =require("./ArticleContoller");


//method to display profile

exports.getUserProfile = async (req, res) => {
  try {

    if (!req.session.user || !req.session.user.id) {
      return res.status(401).render("pages/404", { message: "Unauthorized: Please log in" });
    }
    const userId = req.session.user.id;
  
    // fetch the user from the database
    const user = await User.findByPk(userId);
    const articles = await ArticleContoller.getArticlesByUser(userId) || [];

    
    if (!user) {
      return res.status(404).render("pages/404", { errStatus: "404", errMessage: "User not found" });
    }

    // Count the number of articles by the user
    const articleCount = await Article.count({
      where: { user_id: userId }
    });

    // Count the number of comments made by the user
    const userCommentCount = await Comment.count({
      where: { user_id: userId }
    });

    // Count the number of comments made on the user's articles
    const articleCommentCount = await Comment.count({
      include: [
        {
          model: Article,
          as: 'article',
          where: { user_id: userId }
        }
      ]
    });

    res.render("pages/profile", { user,articles,articleCount,userCommentCount,articleCommentCount});
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Error fetching user profile");
  }

};



 //method to update user profile

 exports.updateUserProfile = async (req, res) => {

  // Joi validation schema
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .allow('')  
      .optional(),
    
    email: Joi.string()
      .email()
      .allow('')  
      .optional(),
    
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .allow('')  
      .optional(),
    
    confirmpassword: Joi.string()
      .valid(Joi.ref('password'))
      .allow('')  
      .optional(),

    bio: Joi.string()
      .allow('')  
      .optional(),
      
    job: Joi.string()
      .allow('')  
      .optional()

  });
  
  try {
    // Validate the request body against the schema
    const { error } = schema.validate(req.body);

    
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const userId = req.session.user.id;  
    const { username, email, password, bio,job } = req.body;
    const user = await User.findByPk(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's profile fields
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.job = job || user.job;

    // Hash password
    if (password) {
      user.password = await bcrypt.hash(password, 10); 
    }

    // Profile picture update 
    if (req.file) {
      user.profilePicture = req.file.filename;
    }

   
    await user.save();

    return res.status(200).json({ message: "Profile updated successfully" });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Error updating profile");
  }
};
 
