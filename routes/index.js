var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/ocap", function(req, res)
{
	var db = req.db;
	var collection = db.collection("ocap");
	collection.find({},{}, function(e, docs)
	{
		console.log(docs);
		res.render("ocap", {//"title": "OCAP", 
			"ocap": docs});
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

ocapmon = mongoose.model("ocapmon", ocapmonSchema, "ocap");

router.post("/submitpoke", function(req, res)
{
	
	mongoose.connection = req.db;

	var userName = req.body.username;
	var pin = req.body.pin;
	var desc = req.body.desc;
	var moves = req.body.movepool.split(", ");

	var newMon = new ocapmon(
	{
		submission:
		{
			description: desc,
			movepool: moves
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

	//var db = req.db;



	//console.log("got here at least");


	//var collection = db.collection("ocapTest");

	// collection.insert(
	// {
	// 	"author.username": userName,
	// 	"author.pin": pin
	// }, function (err, doc)
	// {
	// 	if (err)
	// 	{
	// 		// collection.find({},{},{}).toArray(function(err, docs)
	// 		// {
	// 		// 	for (i in docs)
	// 		// 	{
	// 		// 		console.log(docs[i]);
	// 		// 	}
	// 		// });

	// 		res.send("Issue");
	// 	}
	// 	else
	// 	{
	// 		res.redirect("ocap");
	// 	}
	// });
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