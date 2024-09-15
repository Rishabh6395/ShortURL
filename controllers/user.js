const User = require('../models/user');
const {v4: uuidv4} = require('uuid')
const {setUser} = require('../service/auth')

const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Create a new user instance with the extracted data
        const newUser = new User({ name, email, password });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(201).send('User created successfully');
    } catch (error) {
        // Handle any errors during saving
        console.error(error);
        res.status(400).send(error.message);
    }
    return res.redirect("/");
};
const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if(!user)
        return res.render("login", {error: "Invalid email or password"});

    const token = setUser(user)
    res.cookie('uid', token)
    return res.redirect("/");
    
};

module.exports = { handleUserSignup,handleUserLogin };
