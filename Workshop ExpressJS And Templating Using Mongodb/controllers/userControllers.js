const { userModel, tokenBlackListModel } = require('../models');
const jwt = require('../utils/jwt');
const appConfig = require('../app-config');

function getRegister(req, res, next) {
    res.render('register.hbs');
}

function postRegister(req, res, next) {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        res.render('register.hbs', {
            errors: {
                repeatPassword: 'Password and repeat password don\'t mach'
            }
        });
        return;
    }
    return userModel.create({ username, password }).then(() => {
        res.redirect('/login');
    }).catch(error => {
        if (error.name = 'MongoError' && error.code === 11000) {
            console.log(error)
            res.render('register.hbs', {
                errors: {
                    username: 'Username already taken!'
                }
            });
            return
        }
        next(error);
    });
}

function getLogin(req, res, next) {
    res.render('login.hbs');
}

function postLogin(req, res, next) {
    const { username, password } = req.body;
    userModel.findOne({ username })
        .then(user => Promise.all([user, user.matchPassword(password)]))
        .then(([user, match]) => {
            if (!match) {
                res.render('login.hbs', { message: 'Wrong password or username' });
                return;
            }
            const token = jwt.createToken({ id: user._id });
            res.cookie(appConfig.authCookieName, token).redirect('/')
        })
}

function getLogout(req, res) {
    // isLogged = false;
    const token = req.cookies[appConfig.authCookieName];
    tokenBlackListModel.create({ token }).then(() => {
        res.clearCookie(appConfig.authCookieName).redirect('/');
    })
}

function isLogged(req, res, next) {
    const isLogged = (req.cookies && req.cookies.user && req.cookies.user.username !== null) ? true : false;
    res.body = { isLogged }
    next()
}

function setCookie(req, res) {
    const user = Object.assign({}, { id: res.body.id, username: res.body.username });
    res.cookie('user', user);
    res.redirect('/')
}

module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    getLogout,
    setCookie,
    isLogged
}