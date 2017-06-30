const articleController = require('../controllers/articleController.js');
const router = require('express').Router();

router.get("/scrape", (req, res, next) => {
    articleController.scrapeWebsite(req, res, next);
});

router.get("/", (req, res) => {
    articleController.renderHome(req, res);
});

router.post('/save', (req, res) => {
    articleController.saveArticle(req, res);
});

router.post('/unsave', (req, res) => {
    articleController.unsaveArticle(req, res);
});

router.get("/saved", (req, res) => {
    articleController.viewSaved(req, res);
});

//For testing
// Grab an article by it's ObjectId
router.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Models.Article.findOne({ "_id": req.params.id })
  // ..and populate all of the comment associated with it
  .populate("comment")
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});


module.exports = router;