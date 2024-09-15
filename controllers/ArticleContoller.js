const { Model } = require("sequelize");

const blog = require("../models").Article;
const {User}= require("../models");
const body = require('body-parser');


class ArticleContoller {
async getAllArticles(req, res){
    try{
        const articles = await blog.findAll();
        res.render('pages/home', {articles});
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
        if(article !== null){
            res.render('pages/blog', {article});
        }else{
            res.render('404');
        }
    }catch(error){
        console.error(error)
    }
}
async createArticle(req, res){
    const {title, description, content} = req.body;
    try{
        let user_id = req.session.user.id;
        const article = await blog.create({
            user_id,
            title,
            description,
            content,
        });
        if(article){
            res.status(200).render('pages/addBlog');
        }else{
            res.status(400).render('pages/addBlog');

        }
 
    }catch(error){
        console.error('errrrrrrr'+error);
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
async deleteBlog(req,res){
    // console.log('heelo',req.session.user.id);
    let id= req.body.id;
    try{
        let article = await blog.findByPk(id);
        if(!article){
            return res.status(404).render("pages/404");
        }
        await article.destroy();
        res.redirect('/profile');


    }catch(error){
        console.error(error)
    }
}
async editBlog(req, res){
    let id = req.params.id;
    try{
        let article= await blog.findByPk(id);
        if(!article){
            res.render('pages/404');
        }
        res.render('pages/updateBlog', {article});
    }catch(error){
        console.error('Error in edit blog methpd:'+ error);
    }
}
async updateBlog(req, res){
    console.log('weeeeeeeeeeeeeeeeeeee')
    let id = req.params.id;
    const {title, description, content} = req.body;
    console.log(req.body);

    try{
        let article = await blog.findByPk(id);
        if(!article){
            res.render('pages/404');
        }
        article.title = title;
        article.description = description;
        article.content = content;
        await article.save();
        res.redirect('/profile');


    }catch(error){
        console.error('article not found to be updated: '+ error);
    }
}

}




module.exports = new ArticleContoller;