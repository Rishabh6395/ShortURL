const User = require('../models/user');

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
};

module.exports = { handleUserSignup };
