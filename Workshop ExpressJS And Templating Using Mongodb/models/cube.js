const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 250
    },
    imageUrl: {
        type: String,
        match: /^http[s]?:\/\/.+/gi,
        required: true
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{ type: mongoose.Types.ObjectId, ref: 'Accessory' }],
    creatorId: { type: mongoose.Types.ObjectId, ref: 'User' }
})

// cubeSchema.path('imageUrl')
//     .validate(function () {
//         return this.imageUrl.match(/^http[s]?:\/\/.+/gi)
//     }, 'Image URL must start with http or https!')


module.exports = mongoose.model('Cube', cubeSchema);