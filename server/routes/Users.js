const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')
const validateToken = require('../middlewares/authMiddleWare')
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
            res.status(200).json({ success: 'you logged in', token: accessToken, id: user.id, username: username });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('error: something went wrong');
    }
});
router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
})
router.get('/basicInfo/:id', async (req, res) => {
    const id = req.params.id;
    const basicInfo = await Users.findByPk(id, {
        attributes: { exclude: ['password'] }
    })
    res.json(basicInfo)
})
router.put('/changepassword', validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await Users.findOne({ where: { username: req.user.username } })
    bcrypt.compare(oldPassword, user.password).then((match) => {
        if (!match) {
            return res.status(401).json('error: wrong password entered');
        }
        bcrypt.hash(newPassword, 10).then((hash) => {
           Users.update({password:hash},{ where: { username: req.user.username  }})
            res.json('success')
        })
    });
})
module.exports = router