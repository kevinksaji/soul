const userService = require('./user.service');
const jwt = require('jsonwebtoken')
const {findUserByEmail} = require("./user.service");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (await userService.findUserByEmail(email)) {
            return res.status(400).json({message: "User already exists"});
        }

        const user = await userService.createUser({name, email, password});
        res.status(201).json({
            message: "User registered successfully",
            user: {id: user._id, name: user.name, email: user.email}
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) return res.status(400).json({message: "Invalid email or password"});

        const isMatch = await require('bcryptjs').compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Invalid email or password"});

        const token = jwt.sign({userId: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '7d'});
        res.json({token, user: {id:user._id, name: user.name, email:user.email}});

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}