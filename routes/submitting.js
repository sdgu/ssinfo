var express = require('express');
var router = express.Router();



router.post("/submitpoke", function(req, res)
{
	var db = req.db;

	var userName = req.body.username;
	var pin = req.body.pin;

	console.log("got here at least");


	var collection = db.collection("ocapTest");

	var test1 = new Test(
	{
  		author:
  		{
    		username: userName,
    		pin: pin
  		}
	});

	test1.save(function(err)
	{
  		if (err) throw err;
  		console.log("good");
	});
});

module.exports = router;