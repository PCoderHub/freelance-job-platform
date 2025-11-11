const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        return res.status(400).json({
            message: "User already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name, email, password: hashedPassword, role
    });

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) {
        return res.status(404).json({
            message: "User not found",
        })
    }
    
    const isMatch = await bcrypt.compare( password, user.password );

    if(!isMatch) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
})

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User logged out successfully"
    })
})

const getMyProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if(!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json(user);
});

const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        message: "User profile updated successfully",
        updatedUser
    })
})

const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if(!isMatch) {
        return res.status(400).json({
            message: "Current password is incorrect"
        });
    }

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
        message: "Password changed successfully"
    })
})

module.exports = {
    registerUser, loginUser, logoutUser, getMyProfile, updateProfile, changePassword
}