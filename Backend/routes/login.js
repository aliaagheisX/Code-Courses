const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');
const db = require('../config/database');
const userRepo = require('../repositories/userRepository');

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity({
            min: 8,
            max: 128,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
            requirementCount: 4,
        }).required(),
    });
    return schema.validate(user);
}

router.post('/login', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
   
    try {
        let userEmail = await userRepo.checkEmailQuery(req.body.email);
        if (!userEmail)
            return res.status(400).send({ message: 'Invalid email' });
    } catch (err) {
        return res.status(500).send({ message: "Internal server error checking email\n" + err });
    }
    
    try {
        let userPassword = await userRepo.getUserPassword(req.body.email);
        if (userPassword) {
            const validPassword = await bcrypt.compare(req.body.password, userPassword._password);
            if (!validPassword) 
                return res.status(400).send({ message: "Invalid password" });
        } 
    } catch (err) {
        return res.status(500).send({ message: "Internal server error checking password\n" + err });
    }
    
    try {
        let user = await userRepo.getUser(req.body.email);
        const token = jwt.sign({ user }, process.env.PRIMARY_KEY);    
        return res.status(200).send({ 
            token: token,
            user: user,
        });
    } catch (err) {
        return res.status(500).send({ message: "Internal server error checking user\n" + err });
    }
});

module.exports = router;