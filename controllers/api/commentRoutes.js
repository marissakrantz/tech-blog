const router = require('express').Router();
const { Comment } = require('../../models');
const loginAuth = require('../../utils/auth');

router.post('/', loginAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.session.post_id
        });

        res.status(200).json(newComment);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router