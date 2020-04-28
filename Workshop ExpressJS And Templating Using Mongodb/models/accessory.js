const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 250
    },
    cubes: [{ type: mongoose.Types.ObjectId, ref: 'Cube' }]
})

accessorySchema.path('imageUrl')
    .validate(function () {
        return this.imageUrl.match(/^http[s]?:\/\/.+/gi)
    }, 'Image URL must start with http or https!')

module.exports = mongoose.model('Accessory', accessorySchema);