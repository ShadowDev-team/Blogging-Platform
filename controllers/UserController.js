const {User} = require("../models");

//method to display profile
exports.getUserProfile = async (req,res) =>{
    try{

        const userId = req.id;
        console.log("userID",userId);
        // fetch the user from the database
        const user = await User.findByPk(userId);

        if(!user){
            return res.status(404).send("User not found");
        }

        res.render("pages/profile",{user});

    }catch(error){
        console.error('Error fetching user profile:', error);
        res.status(500).send('Error fetching user profile');
    }
}