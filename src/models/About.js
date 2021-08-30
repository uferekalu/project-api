const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema({
    projects: [
        {
            date: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            role: {
                type: String,
            },
            nature: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },

        }
    ],
    
}, {timestamps: true})

module.exports = mongoose.model('About', AboutSchema)