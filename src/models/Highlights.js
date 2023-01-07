const mongoose = require('mongoose')

const HighlightsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Highlights', HighlightsSchema)