const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    weburl: {
        type: String,
        required: true
    },
    webtitle: {
        type: String,
        required: true
    },
    repourl: {
        type: String,
        required: true
    },
    repotitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
}, {timestamps: true})

module.exports = mongoose.model('Project', ProjectSchema)