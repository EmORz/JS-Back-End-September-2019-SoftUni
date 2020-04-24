const articleModel = require('../models/articleModels')
const jwt = require('jsonwebtoken');

function getAll(req, res, next) {
    jwt.verify(res.token, 'my_secret_key', function (err, data) {
        if (err) {
            res.redirect('/register');
            return;
        }
        const { isLogged } = res.body;
        articleModel.getAllArticles().then(articles => {
            const content = {};
            articleModel.articlesCategory.map(
                category => {
                    content[category.title] = [];
                    articles.map(art => {
                        if (category.descr === art.category) {
                            content[category.title].push(art)
                        }
                    })
                }
            )
            res.render('home.hbs', { content, isLogged });
        }).catch(next)
    });

}

function getDetails(req, res, next) {
    jwt.verify(res.token, 'my_secret_key', function (err, data) {
        if (err) {
            res.redirect('/register');
            return;
        }
        const useremail = data.user.email;
        const { isLogged } = res.body;
        const id = +req.params.id;
        articleModel.getOneArticle(id).then(function (article) {
            const isAuthor = useremail===article['creator-email'];
            res.render('details.hbs', { article, isLogged, isAuthor });
        }).catch(next)
    });
}

function getEdit(req, res, next) {
    jwt.verify(res.token, 'my_secret_key', function (err, data) {
        if (err) {
            res.redirect('/register');
            return;
        }
        // const useremail = data.user.email;
        const { isLogged } = res.body;
        const id = +req.params.id;
        articleModel.getOneArticle(id).then(function (article) {
            // const isAuthor = useremail===article['creator-email'];
            res.render('edit.hbs', { article, isLogged });
        }).catch(next)
    });
}

function postEdit(req, res, next) {
    // jwt.verify(res.token, 'my_secret_key', function (err, data) {
    //     if (err) {
    //         res.redirect('/register');
    //         return;
    //     }
    //     const { isLogged } = res.body;
    //     const id = +req.params.id;
    //     articleModel.getOneArticle(id).then(function (article) {
    //         res.render('edit.hbs', { article, isLogged });
    //     }).catch(next)
    // });
    res.redirect('/');
}


module.exports = {
    getAll,
    getDetails,
    getEdit,
    postEdit
}