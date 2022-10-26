const router = require('express').Router();
const { Post } = require('../../models');
const loginAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (error) {
        res.status(400).json(error);
    }
});

// update product
router.put('/:id', async (req, res) => {
    // update product data
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post with this ID' });
            return;
        }

        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', loginAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post with this ID' });
            return;
        }

        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;