const fs = require('fs');
const path = require('path');

class ArticleModel {
    constructor() {
        this.articleData = require('../config/articleDb.json')
    }

    _write(newData, resolveData) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve('./config/articleDb.json'), JSON.stringify(newData, null, 2), (err) => {
                if (err) { reject(err); return; }
                this.articleData = newData;
                resolve(resolveData);
            });
        });
    }

    get articlesCategory() {
        return this.articleData.articlesCategory;
    }

    getAllArticles() {
        return Promise.resolve(this.articleData.articles);
    }

    getOneArticle(id) {
        return Promise.resolve(this.articleData.articles.find(({ id: articleId }) => articleId === id));
    }

    changeArticle(article) {
        const newArticleData = {
            "lastIndex": this.articleData.lastIndex,
            "articles": this.articleData.articles.map(art => art.id !== article.id ? art : Object.assign(art, article)),
            "articlesCategory": this.articleData.articlesCategory.slice(0)
        }
        return this._write(newArticleData, article);
    }
}

module.exports = new ArticleModel();