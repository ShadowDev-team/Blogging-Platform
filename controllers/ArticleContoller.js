const { Model } = require("sequelize");

const blog = require("../models").Article;
const {User}= require("../models");

class ArticleContoller {
async getAllArticles(req, res){
    try{
        const articles = await blog.findAll();
        res.render('home', {articles});
    }catch(error){
        console.error( error);
    }
}

async getBlogById(req, res){
    const id= req.params.id;
    try{
        
        const article = await blog.findByPk(id,{
            include: [{
                model: User,
                as: 'author'
            }]
        });
        // console.log(article.author.username);


        if(article !== null){
            res.render('blog', {article});
        }else{
            res.render('404');
        }

 
    }catch(error){
        console.error(error)
    }
}

// function to fetch all articles of a user
async getArticlesByUser(userId){
    
    try{
    const articles = await blog.findAll({
        where: {user_id:userId}
    });
    return articles;
    }
    catch(error){
        console.error("Error fetching articles",error);
    }    
}

}




module.exports = new ArticleContoller;