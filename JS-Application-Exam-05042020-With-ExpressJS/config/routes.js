const userControllers = require('../controllers/userControllers');
const articleControllers = require('../controllers/articleControllers');

module.exports = (app) => {

    app.get('/', userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.getAll);

    app.get('/login', userControllers.getLogin);
    app.post('/login', userControllers.postLogin, userControllers.setCookie);
    app.get('/logout', userControllers.getLogout);


    app.get('/register', userControllers.getRegister)
    app.post('/register', userControllers.postRegister)

    app.get('/details/:id', userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.getDetails)

    app.get('/edit/:id', userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.getEdit)
    app.post('/edit/:id', userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.postEdit)

    app.get('/delete/:id', userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.getDelete)

    app.get('/create', userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.getCreate)
    app.post('/create', userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.postCreate)
};