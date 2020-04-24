const fs = require('fs');
const path = require('path');

class ArticleModel {
    constructor() {
        this.articleData = require('../config/articleDb.json')
    }

    get articlesCategory(){
        return this.articleData.ariclesCategory;
    }

    getAllArticles() {
        return Promise.resolve(this.articleData.articles);
    }

    getOneArticle(id) {
        return Promise.resolve(this.articleData.articles.find(({ id: articleId }) => articleId === id));
    }
}

module.exports = new ArticleModel();