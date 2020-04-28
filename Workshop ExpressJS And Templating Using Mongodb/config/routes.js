const { cubeControlers, accessoryControlers, otherControlers } = require('../controllers');

module.exports = (app) => {

    app.get('/', cubeControlers.getAllCubes)
    app.post('/', cubeControlers.searchCubes)

    app.get('/details/:id', cubeControlers.getCube)

    app.get('/about', otherControlers.getAbout)

    app.get('/create', cubeControlers.getCreate)
    app.post('/create', cubeControlers.postCreate)

    app.get('/create/accessory', accessoryControlers.getCreate)
    app.post('/create/accessory', accessoryControlers.postCreate)

    app.get('/attach/accessory/:id', accessoryControlers.getAttach)
    app.post('/attach/accessory/:id', accessoryControlers.postAttach)

    app.all('*', otherControlers.notFound)
};