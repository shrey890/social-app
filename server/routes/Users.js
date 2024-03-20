const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
router.post('/', async (req, res) => {
    const { username, password } = req.body
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        })
        res.json('success')
    })
})
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Users.findOne({ where: { username: username } });
        if (!user) {
            return res.status(404).json('error: user not found');
        }

        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                return res.status(401).json('error: wrong password');
            } 
            
            const accessToken = sign({ username: user.username, id: user.id }, 'importantsecret');
            res.status(200).json({ success: 'you logged in', accessToken:accessToken });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('error: something went wrong');
    }
});

module.exports = router