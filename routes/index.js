var express = require('express');
var router = express.Router();
var app = express();

var mongoose = require("mongoose");
var uniqueVal = require("mongoose-unique-validator");

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
			"title": "OCAP",
			"last5users": docs,
			"updatedusername": updatedusername,
			"err" : err,

			"reusername" : reusername,
			"repin" : repin,
			"remonname" : remonname,
			"redesc" : redesc,
			"reprim" : reprim,
			"resec" : resec,
			"reab1" : reab1,
			"reab2" : reab2,
			"reab3" : reab3,
			"rehp" : rehp,
			"reatk" : reatk,
			"redef" : redef,
			"respa" : respa,
			"respd" : respd,
			"respe" : respe
		});

	});
	//console.log(err);
	
});

router.post("/fetchmon", function(req, res)
{
	var db = req.db;
	var collection = mongoose.model("ocapmon", ocapmonSchema, "ocap");

	var name = req.body.whichmon;

	collection.find({"author.username": name},{}, function(e, docs)
	{
		//console.log(docs),
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

	if (err != "") err = "";

	collection.find({"submission.name": name},{}, function(e, docs)
	{
		if (docs.length > 0)
		{
			err = "Mon name already exists.";
		}

	});
	res.redirect("ocap");

});



var reusername;
var repin;
var remonname;
var redesc;
var reprim;
var resec;
var reab1;
var reab2;
var reab3;
var rehp, reatk, redef, respa, respd, respe;



router.post("/submitpoke", function(req, res)
{
	//if (reusername != "") reusername = "";

	var collection = ocapmon;

	mongoose.connection = req.db;

	var bod = req.body;


	var usernameIn = bod.username;
	var pinIn = bod.pin;
	var pokenameIn = bod.name;
	var descIn = bod.desc;
	var primTypeIn = bod.primtypingin;

	var secdTypeIn = bod.sectypingin;
		console.log("typing: " + primTypeIn + " / " + secdTypeIn);

	var ab1In = bod.ab1;
	var ab2In = bod.ab2;
	var ab3In = bod.ab3;
	var HPIn = bod.HP;
	var AtkIn = bod.Atk;
	var DefIn = bod.Def;
	var SpAIn = bod.SpA;
	var SpDIn = bod.SpD;
	var SpeIn = bod.Spe;
	var movesIn = bod.movepool;
	var prevoIn = bod.prevo;
	var evoIn = bod.evo;
	var flavorIn = bod.flavor;


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
			typing:
			{
				primary: primTypeIn,
				secondary: secdTypeIn
			},
			abilities:
			{
				primary: ab1In,
				secondary: ab2In,
				tertiary: ab3In
			},
			stats:
			{
				HP: HPIn,
				Atk: AtkIn,
				Def: DefIn,
				SpA: SpAIn,
				SpD: SpDIn,
				Spe: SpeIn
			},
			movepool: movesIn,
			family:
			{
				prevo: prevoIn,
				evo: evoIn
			},
			flavor: flavorIn,
			name: pokenameIn
		}
	});

	newMon.save(function(e)
	{
		console.log("Error: " + e);
		if (e != null)
		{
			console.log("error was not null");
			reusername = usernameIn;
			repin = pinIn;
			remonname = pokenameIn;
			redesc = descIn;
			reprim = primTypeIn;
			resec = secdTypeIn;
			reab1 = ab1In;
			reab2 = ab2In;
			reab3 = ab3In;
			rehp = HPIn;
			reatk = AtkIn;
			redef = DefIn;
			respa = SpAIn;
			respd = SpDIn;
			respe = SpeIn;
			err = e;
		}
		else
		{
			console.log("submitted poke");
			reusername = "";
			repin = "";
			remonname = "";
			redesc = "";
			reprim = "";
			resec = "";
			reab1 = "";
			reab2 = "";
			reab3 = "";
			rehp = "";
			reatk = "";
			redef = "";
			respa = "";
			respd = "";
			respe = "";
			err = null;
		}
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