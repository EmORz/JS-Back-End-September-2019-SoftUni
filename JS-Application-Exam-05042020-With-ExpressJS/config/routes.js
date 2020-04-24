const userControllers = require('../controllers/userControllers');
const articleControllers = require('../controllers/articleControllers');

module.exports = (app) => {

    app.get('/home', userControllers.isLogged, userControllers.addToken, userControllers.ensureToken, articleControllers.getAll);

    app.get('/login', userControllers.getLogin);
    app.post('/login', userControllers.postLogin, userControllers.setCookie);
    app.get('/logout', userControllers.getLogout);


    app.get('/register', userControllers.getRegister)
    app.post('/register', userControllers.postRegister)
    // app.post('/login')

};