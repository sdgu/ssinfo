var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var uniqueVal = require("mongoose-unique-validator");

var ocapmonSchema = mongoose.Schema(
{
	author:
	{
		username: {type: String, unique: true},
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
		family:
		{
			prevo: String,
			evo: String
		},
		flavor: String,
		name: {type: String, unique: true}
	}
});


//collection is the last arg
ocapmon = mongoose.model("ocapmon", ocapmonSchema, "ocap");


var app = express();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var updatedusername;

var err;



router.get("/ocap", function(req, res)
{
	var db = req.db;
	var collection = mongoose.model("ocapmon", ocapmonSchema, "ocap");
	collection.find({},{}, function(e, docs)
	{
		//console.log(docs[0]);
		res.render('ocap', 
			{

				"ocap": docs,
				"updatedusername": updatedusername,
				"err" : err
			});
	});
	
});

router.post("/fetchmon", function(req, res)
{
	var db = req.db;
	var collection = mongoose.model("ocapmon", ocapmonSchema, "ocap");

	var name = req.body.whichmon;

	collection.find({"author.username": name},{}, function(e, docs)
	{
		console.log(docs),
		//will always be 0 because will prevent adding same named poke
		updatedusername = docs[0].author.username
	});
	res.redirect("ocap");
});


router.post("/checkmonname", function(req, res)
{
	var db = req.db;
	var collection = mongoose.model("ocapmon", ocapmonSchema, "ocap");

	var name = req.body.name;

	collection.find({"submission.name": name},{}, function(e, docs)
	{
		console.log(docs)
		if (docs.length > 0)
		{
			err = "Mon name already exists.";
		}

	});
	res.redirect("ocap");

});

router.post("/submitpoke", function(req, res)
{
	var collection = ocapmon;

	mongoose.connection = req.db;

	var pokenameIn = req.body.name

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
			movepool: movesIn,
			name: pokenameIn
		}
	});

	newMon.save(function(err)
	{

		console.log(err);
		// ocapmon.find({"author.username":"Lemonade"}, "author submission", function(err, result)
		// {
		// 	if (err) throw err;
		// 	console.log("Found: " + result);
		// });
		res.redirect("ocap");
	})
});

ocapmonSchema.plugin(uniqueVal);
module.exports = router;

	// db.collection(myCollection).find({},{},{}).toArray(function(err, docs)
	// {
	// 	for (index in docs)
	// 	{
	// 		console.log(docs[index]);
	// 	}
	// 	printMenu(dbConn);
	// });