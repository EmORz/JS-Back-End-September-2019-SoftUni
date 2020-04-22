const cubeModel = require('../models/cube');

function getAllCubes(req, res, next) {
    cubeModel.getAll().then(cubes => {
        res.render('index.hbs', { cubes });
    }).catch(next)
}

function getCube(req, res, next) {
    const id = +req.params.id;
    cubeModel.getOne(id).then(cube => {
        if (!cube) {
            res.redirect('/not-found');
            return
        }
        res.render('details.hbs', { cube });
    }).catch(next)
}

function getCreate(req, res) {
    res.render('create.hbs');
}

function postCreate(req, res, next) {

    const { name, description, imageUrl, difficultyLevel } = req.body;
    const newCube = cubeModel.create(name, description, imageUrl, difficultyLevel);
    cubeModel.insert(newCube)
        .then(cube => {
            res.redirect('/');
        })

}

module.exports = {
    getAllCubes,
    getCube,
    getCreate,
    postCreate
};