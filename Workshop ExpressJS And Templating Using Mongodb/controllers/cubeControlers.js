const {cubeModel } = require('../models');

function getAllCubes(req, res, next) {
    cubeModel.find().then(cubes => {
        res.render('index.hbs', { cubes });
    }).catch(next)
}

function searchCubes(req, res, next) {
    const { search, from, to } = req.body;
    cubeModel.find().then(cubes => {
        const filteredCubes = cubes.filter(cube => {
            return (from !== "" && to !== "")
                ? cube.name.toLowerCase().includes(search.toLowerCase()) && cube.difficultyLevel >= Number(from) && cube.difficultyLevel <= Number(to)
                : cube.name.toLowerCase().includes(search.toLowerCase())
        });
        res.render('index.hbs', { cubes: filteredCubes.length > 0 ? filteredCubes : cubes });
    }).catch(next)
}

function getCube(req, res, next) {
    const id = req.params.id;
    cubeModel.findById(id).populate('accessories').then(cube => {
        res.render('details.hbs', { cube });
    }).catch(next)
}

function getCreate(req, res) {
    res.render('create.hbs');
}

function postCreate(req, res, next) {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    cubeModel.create({ name, description, imageUrl, difficultyLevel }).then(cube => {
        res.redirect('/');
    }).catch(next)
}

module.exports = {
    getAllCubes,
    searchCubes,
    getCube,
    getCreate,
    postCreate
};