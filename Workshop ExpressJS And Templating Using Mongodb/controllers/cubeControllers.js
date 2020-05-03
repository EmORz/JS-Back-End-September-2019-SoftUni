const { cubeModel } = require('../models');
const { difficultyLevel } = require('../app-config')

function getAllCubes(req, res, next) {
    const user = req.user;
    cubeModel.find().then(cubes => {
        res.render('index.hbs', { cubes, user });
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
    const user = req.user;
    const id = req.params.id;
    cubeModel.findById(id).populate('accessories').then(cube => {
        const isCreator = user.id === cube.creatorId.toString() ? true : false;
        res.render('details.hbs', { cube, user, isCreator });
    }).catch(next)
}

function getCreate(req, res) {
    const user = req.user;
    res.render('create.hbs', { user });
}

function postCreate(req, res, next) {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    const creatorId = req.user.id;
    cubeModel.create({ name, description, imageUrl, difficultyLevel, creatorId }).then(cube => {
        res.redirect('/');
    }).catch(next)
}

function getEdit(req, res, next) {
    const id = req.params.id;
    const user = req.user;
    cubeModel.findById({ _id: id, creatorId: user.id }).then(cube => {
        const cubeDifficultyLevel = difficultyLevel.map(level => {
            const valueLevel = +level.split(' - ')[0];
            return valueLevel === cube.difficultyLevel
                ? `<option value="${valueLevel}" selected="selected">${level}</option>`
                : `<option value="${valueLevel}">${level}</option>`
        }).join('');
        res.render('editCube.hbs', { cube, user, cubeDifficultyLevel });
    }).catch(next)
}

function postEdit(req, res, next) {
    const id = req.params.id;
    const { name, description, imageUrl, difficultyLevel } = req.body;
    const creatorId = req.user.id;
    cubeModel.updateOne({ _id: id }, { name, description, imageUrl, difficultyLevel }).then(cube => {
        res.redirect('/');
    }).catch(next)
}

function getDelete(req, res, next) {
    const id = req.params.id;
    const user = req.user;
    cubeModel.findById({ _id: id, creatorId: user.id }).then(cube => {
        const cubeDifficultyLevel = difficultyLevel.map(level => {
            const valueLevel = +level.split(' - ')[0];
            return valueLevel === cube.difficultyLevel
                ? `<option value="${valueLevel}" selected="selected">${level}</option>`
                : `<option value="${valueLevel}">${level}</option>`
        }).join('');
        res.render('deleteCube.hbs', { cube, user, cubeDifficultyLevel });
    }).catch(next)
}

function postDelete(req, res, next) {
    const id = req.params.id;
    const user = req.user;
    cubeModel.findByIdAndDelete({ _id: id, creatorId: user.id }).then(() => {
        res.redirect('/');
    }).catch(next)
}



module.exports = {
    getAllCubes,
    searchCubes,
    getCube,
    getCreate,
    postCreate,
    getEdit,
    postEdit,
    getDelete,
    postDelete
};