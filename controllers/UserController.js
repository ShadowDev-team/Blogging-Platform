const { User } = require("../models");
const bcrypt = require('bcrypt');
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
      return res.status(404).render("pages/404", { message: "User not found" });
    }
    
    res.render("pages/profile", { user,articles });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Error fetching user profile");
  }

};



 //method to update user profile

exports.updateUserProfile = async (req, res) => {
    try {

      const userId = req.id;
      const { username, email, password, bio,confirmpassword} = req.body;

      const user = await User.findByPk(userId);

      if (!user) {
        res.status(404).render("pages/404", { message: "User not found" });
      }

      user.username = username || user.username;
      user.email = email || user.email;
      user.bio = bio || user.bio;
      
      if (password || confirmpassword) {

        if(password !== confirmpassword){
          return res.status(400).json({error:"passwords should match"});
        }
        user.password = await bcrypt.hash(password, 1);
      }

      if(req.file){
        user.profilePicture = req.file.filename;
      }
      await user.save();

      return res.status(200).json({ message: "Profile updated successfully" });

    } catch(error) {
      console.error("Error updating profile:", error);
      res.status(500).send("Error updating profile");
    }
  };
