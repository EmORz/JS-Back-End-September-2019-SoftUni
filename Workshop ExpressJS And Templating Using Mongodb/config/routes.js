const { cubeControllers, accessoryControllers, otherControllers, userControllers } = require('../controllers');
const { auth } = require('../utils')

module.exports = (app) => {

    app.get('/', auth(false), cubeControllers.getAllCubes)
    app.post('/', auth(false), cubeControllers.searchCubes)

    app.get('/register', userControllers.getRegister)
    app.post('/register', userControllers.postRegister)
    app.get('/login', userControllers.getLogin)
    app.post('/login', userControllers.postLogin)
    app.get('/logout', userControllers.getLogout)

    app.get('/details/:id', auth(), cubeControllers.getCube)
    app.get('/create', auth(), cubeControllers.getCreate)
    app.post('/create', auth(), cubeControllers.postCreate)
    app.get('/edit/:id', auth(), cubeControllers.getEdit)
    app.post('/edit/:id', auth(), cubeControllers.postEdit)
    app.get('/delete/:id', auth(), cubeControllers.getDelete)
    app.post('/delete/:id', auth(), cubeControllers.postDelete)

    app.get('/create/accessory', auth(), accessoryControllers.getCreate)
    app.post('/create/accessory', auth(), accessoryControllers.postCreate)
    app.get('/attach/accessory/:id', auth(), accessoryControllers.getAttach)
    app.post('/attach/accessory/:id', auth(), accessoryControllers.postAttach)

    app.get('/about', auth(false), otherControllers.getAbout)

    app.all('*', auth(), otherControllers.notFound)
};
