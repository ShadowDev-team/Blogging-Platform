const { User } = require("../models");

//method to display profile

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.id;

    // fetch the user from the database
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).render("pages/404", { message: "User not found" });
    }

    res.render("pages/profile", { user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Error fetching user profile");
  }

};


 //method to update user profile

exports.updateUserProfile = async (req, res) => {
    try {

      const userId = req.id;
      const { username, email, password, bio} = req.body;

      const user = await User.findByPk(userId);

      if (!user) {
        res.status(404).render("pages/404", { message: "User not found" });
      }

      user.username = username || user.username;
      user.email = email || user.email;
      user.bio = bio || user.bio;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      if(req.file){
        user.profilePicture = req.file.filename;
      }
      await user.save();

      return res.status(200).send("Profile updated successfully");

    } catch(error) {
      console.error("Error updating profile:", error);
      res.status(500).send("Error updating profile");
    }
  };
