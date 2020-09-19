const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    website: {
        type: String
    },
    githubUserName: {
        type: String
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    linkedin: {
        type: String
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            institute: {
                type: String,
                required: true
            },
            fieldOfStudy: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

const Profile = mongoose.model('profile',ProfileSchema)
module.exports = Profile