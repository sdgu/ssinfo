var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/ocap", function(req, res)
{
	var db = req.db;
	var collection = mongoose.model("ocapmon", ocapmonSchema, "ocap");
	collection.find({},{}, function(e, docs)
	{
		res.render('ocap', 
			{
				"title": "OCAP", 
				"ocap": docs,
			});
	});
	
});


var mongoose = require("mongoose");

var ocapmonSchema = mongoose.Schema(
{
	author:
	{
		username: String,
		pin: String
	},
	submission:
	{
		description: String,
		typing:
		{
			primary: String,
			secondary: String
		},
		abilities:
		{
			primary: String,
			secondary: String,
			tertiary: String
		},
		stats:
		{
			HP: Number,
			Atk: Number,
			Def: Number,
			SpA: Number,
			SpD: Number,
			Spe: Number
		},
		movepool: [String],
		flavor: String,
		name: String
	}
});


//collection is the last one
ocapmon = mongoose.model("ocapmon", ocapmonSchema, "ocap");

router.post("/submitpoke", function(req, res)
{

	mongoose.connection = req.db;

	var usernameIn = req.body.username;
	var pinIn = req.body.pin;
	var descIn = req.body.desc;

	var movesIn = req.body.movepool;


	// if (movesIn.contains(","))
	// {
	// 	movesIn = movesIn.split(", ");
	// }

	var newMon = new ocapmon(
	{
		author:
		{
			username: usernameIn,
			pin: pinIn
		},
		submission:
		{
			description: descIn,
			movepool: movesIn
		}
	});

	newMon.save(function(err)
	{
		if (err) throw err;
		// ocapmon.find({"author.username":"Lemonade"}, "author submission", function(err, result)
		// {
		// 	if (err) throw err;
		// 	console.log("Found: " + result);
		// });
		res.redirect("ocap");
	})
});

router.post("/fetchmon", function(req, res)
{
	console.log("here");
	res.redirect("ocap");
});


module.exports = router;

	// db.collection(myCollection).find({},{},{}).toArray(function(err, docs)
	// {
	// 	for (index in docs)
	// 	{
	// 		console.log(docs[index]);
	// 	}
	// 	printMenu(dbConn);
	// });