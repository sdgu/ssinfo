var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/ocap", function(req, res)
{
	var db = req.db;
	var collection = db.get("ocap");
	collection.find({},{}, function(e, docs)
	{
		res.render("ocap", {"title": "OCAP", "ocap": docs});
	});
	
});



module.exports = router;
