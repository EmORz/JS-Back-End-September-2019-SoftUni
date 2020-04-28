const models = require('../models');

function getCreate(req, res, next) {
    res.render('createAccessory.hbs');
}

function postCreate(req, res, next) {
    const { name, description, imageUrl } = req.body;
    models.accessoryModel.create({ name, description, imageUrl })
        .then(created => { res.redirect('/'); })
        .catch(next);
}

function getAttach(req, res, next) {
    const { id: cubeId } = req.params;
    models.cubeModel.findById(cubeId).then(
        cube => Promise.all([cube, models.accessoryModel.find({ cubes: { $nin: cube._id } })])
            .then(([cube, filterAccessories]) => res.render('attachAccessory.hbs', { accessories: filterAccessories, cube }))
            .catch(next));
}

function postAttach(req, res, next) {
    const { id: cubeId } = req.params;
    const { accessory: accessoryId } = req.body;
    Promise.all([
        models.cubeModel.updateOne({ _id: cubeId }, { $push: { accessories: accessoryId } }),
        models.accessoryModel.updateOne({ _id: accessoryId }, { $push: { cubes: cubeId } })])
        .then(() => {
            res.redirect('/')
        })
        .catch(next);
}


module.exports = {
    getCreate,
    postCreate,
    getAttach,
    postAttach
}