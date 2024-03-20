const express = require('express')
const { Comments } = require('../models')
const router = express.Router()
const validateToken = require('../middlewares/authMiddleWare.js')
// router.get('/:postId', async (req, res) => {
//     const postId = req.params.postId
//     const comments = await Comments.findAll({ where: { postId: postId } })
//     res.json(comments)
// })
// router.post('/',  validateToken,async(req, res) => {
//     const comment = req.body
//     await Comments.create(comment)
//     res.json(comment)
// })
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId
    const comments = await Comments.findAll({ where: { postId: postId } })
    res.json(comments)
});

router.post('/', validateToken, async (req, res) => {
    const comment = req.body
    await Comments.create(comment)
    res.json(comment)
});
module.exports = router