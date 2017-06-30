const commentController = require('../controllers/commentController.js');
const router = require('express').Router();

router.post("/add-comment/:id", (req, res) => {
    commentController.addComment(req, res);
});

router.post("/remove-comment/:id", (req, res) => {
    commentController.removeComment(req, res);
});


module.exports = router;