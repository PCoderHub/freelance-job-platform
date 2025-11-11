const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [ "client", "freelancer", "admin" ],
        default: "freelancer",
    },
    profile: {
        title: {
            type: String,
        },
        bio: {
            type: String,
        },
        profilePic: {
            type: String
        }
    },
    clientProfile: {
        companyName: String,
        companyWebsite: String,
        industry: String,
        description: String,
        hiringBudget: Number,
    },
    freelancerProfile: {
        skills: [String],
        hourlyRate: Number,
        experience: String,
        portfolioLinks: [String],
        availability: String,
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;