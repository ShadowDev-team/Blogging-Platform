const { Model } = require("sequelize");
const blog = require("../models").Article;
const {User}= require("../models");
const body = require('body-parser');




class ArticleContoller {
async getAllArticles(req, res){
    try{
        const articles = await blog.findAll({
            limit: 10,
            order: [['createdAt', 'DESC']],
        });

        res.render('pages/home',{articles});
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
    if(req.session.user){
        const {title, description, content} = req.body;
        let imgPath = null;
        if(req.file){
            imgPath = req.file.filename;
        }
        try{
            let user_id = req.session.user.id;
            const article = await blog.create({
                user_id,
                title,
                description,
                content,
                image: imgPath
            });
            if(article){
                res.status(200).redirect('/');
            }else{
                res.status(400).redirect('/blogs/create');
    
            }
     
        }catch(error){
            console.error('something wrong happend in creating an article'+error);
        }

    }else{
        res.render('pages/auth/login');
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
    if(req.session.user){
        let id= req.body.id;
        try{
            let article = await blog.findByPk(id);
            if(!article){
                return res.status(404).render("pages/404", {errStatus: 404, message: "Article not found"});
            }
            await article.destroy();
            res.redirect('/profile');
    
    
        }catch(error){
            console.error(error)
        }

    }else{
        res.render('pages/auth/login');
    }

}
async editBlog(req, res){
    if(req.session.user){
        const APP_Host = process.env.APP_HOST || 'http://localhost:3000';

        let id = req.params.id;
        try{
            let article= await blog.findByPk(id);
            if(!article){
                res.render('pages/404');
            }
            res.render('pages/updateBlog', {article, APP_Host});
        }catch(error){
            console.error('Error in edit blog methpd:'+ error);
        }

    }else{
        res.redirect('/login');
    }

}
async updateBlog(req, res){
    if(req.session.user){
        let id = req.params.id;

        const {title, description, content} = req.body;
        console.log("Incoming Data:", { title, description, content });

        try{
            let article = await blog.findByPk(id);
            if(!article){
                res.render('pages/404');
            }
            let imgPath = article.image;
            if(req.file){
                imgPath = req.file.filename;
            }
            article.title = title;
            article.description = description;
            article.content = content;
            article.image= imgPath;
            await article.save();
            res.redirect('/profile');
    
    
        }catch(error){
            console.error('article not found to be updated: '+ error);
        }

    }else{
        res.redirect('/login');
    }
 
}

}




module.exports = new ArticleContoller;