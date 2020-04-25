const userControllers = require('../controllers/userControllers');
const articleControllers = require('../controllers/articleControllers');

module.exports = (app) => {

    app.get('/', userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.getAll);

    app.route('/login')
        .get(userControllers.getLogin)
        .post(userControllers.postLogin, userControllers.setCookie);

    app.get('/logout', userControllers.getLogout);

    app.route('/register')
        .get(userControllers.getRegister)
        .post(userControllers.postRegister)

    app.get('/details/:id', userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.getDetails)

    app.route('/edit/:id')
        .get(userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.getEdit)
        .post(userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.postEdit)

    app.get('/delete/:id', userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.getDelete)

    app.route('/create')
        .get(userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.getCreate)
        .post(userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.postCreate)
};