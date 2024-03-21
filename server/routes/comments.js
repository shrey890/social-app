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
    const username = req.user.username
    comment.username =username
    await Comments.create(comment)
    res.json(comment)
});
router.delete('/:commentId', validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    try {
        await Comments.destroy({ where: { id: commentId } });
        res.status(204).send(); // 204 No Content response indicates successful deletion
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Failed to delete comment. Please try again later.' });
    }
});

module.exports = router