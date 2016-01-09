var express = require('express');
var router = express.Router();
var app = express();

var mongoose = require("mongoose");
var uniqueVal = require("mongoose-unique-validator");

var ocapmonSchema = mongoose.Schema(
{
	_id: String,
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
			"respe" : respe,
			"removepool" : removepool,
			"reprevo" : reprevo,
			"reevo" : reevo,
			"reflavor" : reflavor,


			"fetchedusername" : fetchedusername,
			"fetchedMonName" : fetchedMonName,
			"fetchedDesc" : fetchedDesc,
			"fetchedPrim" : fetchedPrim,
			"fetchedSec" : fetchedSec,
			"fetchedAb1" : fetchedAb1,
			"fetchedAb2" : fetchedAb2,
			"fetchedAb3" : fetchedAb3,
			"fetchedHP" : fetchedHP,
			"fetchedAtk" : fetchedAtk,
			"fetchedDef" : fetchedDef,
			"fetchedSpA" : fetchedSpA,
			"fetchedSpD" : fetchedSpD,
			"fetchedSpe" : fetchedSpe,
			"fetchedMovepool" : fetchedMovepool,
			"fetchedPrevo" : fetchedPrevo,
			"fetchedEvo" : fetchedEvo,
			"fetchedFlavor" : fetchedFlavor

		});

});
	//console.log(err);
	
});

var fetchedusername;
var enterpin;
var fetchedMonName;
var fetchedDesc;
var fetchedPrim;
var fetchedSec;
var fetchedAb1;
var fetchedAb2;
var fetchedAb3;
var fetchedHP;
var fetchedAtk;
var fetchedDef;
var fetchedSpA;
var fetchedSpD;
var fetchedSpe;
var fetchedMovepool;
var fetchedPrevo;
var fetchedEvo;
var fetchedFlavor;

router.post("/fetchmon", function(req, res)
{
	var db = req.db;
	var collection = mongoose.model("ocapmon", ocapmonSchema, "ocap");

	var bod = req.body;

	var name = bod.whichmon;


	if (name.indexOf(" ") > -1)
	{
		name.replace(" ", "_");
	}

	console.log("name is: " + name);

	collection.find({"submission.name": name},{}, function(e, docs)
	{
		console.log(docs.length);
		//will always be 0 because will prevent adding same named poke

		if (docs.length == 0)
		{
			//the poke doesn't exist yet
			err = "poke doesn't exist."
		}
		else
		{
			var sub = docs[0].submission;
			fetchedusername = docs[0].author.username;
			//check pin
			fetchedMonName = sub.name;
			fetchedDesc = sub.description;
			//console.log(fetchedDesc);
			fetchedPrim = sub.typing.primary;
			fetchedSec = sub.typing.secondary;
			fetchedAb1 = sub.abilities.primary;
			fetchedAb2 = sub.abilities.secondary;
			fetchedAb3 = sub.abilities.tertiary;
			fetchedHP = sub.stats.HP;
			fetchedAtk = sub.stats.Atk;
			fetchedDef = sub.stats.Def;
			fetchedSpA = sub.stats.SpA;
			fetchedSpD = sub.stats.SpD;
			fetchedSpe = sub.stats.Spe;
			fetchedMovepool = sub.movepool;
			fetchedPrevo = sub.family.prevo;
			fetchedEvo = sub.family.evo;
			fetchedFlavor = sub.flavor;

			err = "";
		}


	});
	res.redirect("ocap");
});

router.post("/updatepoke", function(req, res)
{
	var collection = ocapmon;
	var bod = req.body;

	console.log("editing: " + fetchedMonName);

	//verify username and pin

	//uname will be filled so check pin
	var uname = bod.usernameupdate;

	var upin = bod.pinupdate;


	var updatedName = bod.upname;

	var updatedDesc = bod.descupdate;

	var updatedPrim = bod.upprimtyping;
	var updatedSec = bod.upsectyping;

	var updatedAb1 = bod.upab1;
	var updatedAb2 = bod.upab2;
	var updatedAb3 = bod.upab3;

	var updatedHP = bod.upHP;
	var updatedAtk = bod.upAtk;
	var updatedDef = bod.upDef;
	var updatedSpA = bod.upSpA;
	var updatedSpD = bod.upSpD;
	var updatedSpe = bod.upSpe;

	var updatedMovepool = bod.upmovepool;

	var updatedPrevo = bod.upprevo;
	var updatedEvo = bod.upevo;

	var updatedFlavor = bod.upflavor;



	collection.find({"submission.name" : fetchedMonName},{}, function(e, docs)
	{
		if (docs[0].author.pin == upin)
		{
			console.log("the pin works");
			if (updatedName != fetchedMonName)
			{
				collection.update(
					{"submission.name" : fetchedMonName}, 
					{
						"submission.name" : updatedName,
						"submission.description" : updatedDesc,

						"submission.typing.primary" : updatedPrim,
						"submission.typing.secondary" : updatedSec,

						"submission.abilities.primary" : updatedAb1,
						"submission.abilities.secondary" : updatedAb2,
						"submission.abilities.tertiary" : updatedAb3,

						"submission.stats.HP" : updatedHP,
						"submission.stats.Atk" : updatedAtk,
						"submission.stats.Def" : updatedDef,
						"submission.stats.SpA" : updatedSpA,
						"submission.stats.SpD" : updatedSpD,
						"submission.stats.Spe" : updatedSpe,

						"submission.movepool" : updatedMovepool,

						"submission.family.prevo" : updatedPrevo,
						"submission.family.evo" : updatedEvo,

						"submission.flavor" : updatedFlavor
					}, 
					function(e, docs)
					{
						fetchedusername = "";
						fetchedMonName = "";
						fetchedDesc = "";

						fetchedPrim = "";
						fetchedSec = "";

						fetchedAb1 = "";
						fetchedAb2 = "";
						fetchedAb3 = "";

						fetchedHP = "";
						fetchedAtk = "";
						fetchedDef = "";
						fetchedSpA = "";
						fetchedSpD = "";
						fetchedSpe = "";

						fetchedMovepool = "";
						fetchedPrevo = "";
						fetchedEvo = "";

						fetchedFlavor = "";

						err = "";
						console.log("the new entry " + docs);
					});
			}
			else
			{
				collection.update(
					{"submission.name" : fetchedMonName,}, 
					{
						"submission.name" : updatedName,
						"submission.description" : updatedDesc,

						"submission.typing.primary" : updatedPrim,
						"submission.typing.secondary" : updatedSec,

						"submission.abilities.primary" : updatedAb1,
						"submission.abilities.secondary" : updatedAb2,
						"submission.abilities.tertiary" : updatedAb3,

						"submission.stats.HP" : updatedHP,
						"submission.stats.Atk" : updatedAtk,
						"submission.stats.Def" : updatedDef,
						"submission.stats.SpA" : updatedSpA,
						"submission.stats.SpD" : updatedSpD,
						"submission.stats.Spe" : updatedSpe,

						"submission.movepool" : updatedMovepool,

						"submission.family.prevo" : updatedPrevo,
						"submission.family.evo" : updatedEvo,

						"submission.flavor" : updatedFlavor


					}, 
					function(e, docs)
					{
						//set the fetched fields to blank, "refresh" the form
						fetchedusername = "";
						fetchedMonName = "";
						fetchedDesc = "";

						fetchedPrim = "";
						fetchedSec = "";

						fetchedAb1 = "";
						fetchedAb2 = "";
						fetchedAb3 = "";

						fetchedHP = "";
						fetchedAtk = "";
						fetchedDef = "";
						fetchedSpA = "";
						fetchedSpD = "";
						fetchedSpe = "";

						fetchedMovepool = "";
						fetchedPrevo = "";
						fetchedEvo = "";

						fetchedFlavor = "";

						err = "";


						console.log("the new entry " + docs);
					});
			}
		}
		else
		{
			console.log("pin doesn't work");
			err = "pin doesn't work";
		}
});



	//if changing the name of the mon, rewrite the name in that db entry

// 	if (updatedName != fetchedMonName)
// 	{
// 		collection.update(
// 			{"submission.name" : fetchedMonName}, 
// 			{
// 				"submission.name" : updatedName,
// 				"submission.description" : updatedDesc
// 			}, 
// 			function(e, docs)
// 			{
// 				console.log("the new entry " + docs);
// 			});
// 	}
// 	else
// 	{
// 		collection.update(
// 			{"submission.name" : fetchedMonName,}, 
// 			{
// 				"submission.name" : updatedName,
// 				"submission.description" : updatedDesc,

// 				"submission.typing.primary" : updatedPrim,
// 				"submission.typing.secondary" : updatedSec,

// 				"submission.abilities.primary" : updatedAb1,
// 				"submission.abilities.secondary" : updatedAb2,
// 				"submission.abilities.tertiary" : updatedAb3,

// 				"submission.stats.HP" : updatedHP,
// 				"submission.stats.Atk" : updatedAtk,
// 				"submission.stats.Def" : updatedDef,
// 				"submission.stats.SpA" : updatedSpA,
// 				"submission.stats.SpD" : updatedSpD,
// 				"submission.stats.Spe" : updatedSpe,

// 				"submission.movepool" : updatedMovepool,

// 				"submission.family.prevo" : updatedPrevo,
// 				"submission.family.evo" : updatedEvo,

// 				"submission.flavor" : updatedFlavor


// 			}, 
// 			function(e, docs)
// 			{
// 			//set the fetched fields to blank, "refresh" the form
// 			fetchedusername = "";
// 			fetchedMonName = "";
// 			fetchedDesc = "";

// 			fetchedPrim = "";
// 			fetchedSec = "";

// 			fetchedAb1 = "";
// 			fetchedAb2 = "";
// 			fetchedAb3 = "";

// 			fetchedHP = "";
// 			fetchedAtk = "";
// 			fetchedDef = "";
// 			fetchedSpA = "";
// 			fetchedSpD = "";
// 			fetchedSpe = "";

// 			fetchedMovepool = "";
// 			fetchedPrevo = "";
// 			fetchedEvo = "";

// 			fetchedFlavor = "";

// 			err = "";


// 			console.log("the new entry " + docs);
// 		});
// }
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
var removepool;
var reprevo;
var reevo;
var reflavor;


router.post("/submitpoke", function(req, res)
{
	//if (reusername != "") reusername = "";

	var collection = ocapmon;

	mongoose.connection = req.db;

	var bod = req.body;


	var usernameIn = bod.username;
	var pinIn = bod.pin;
	var pokenameIn = bod.name;

	if (pokenameIn.indexOf(" ") > -1)
	{
		pokenameIn.replace(" ", "_");
	}

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


////////////////////do so if the same username submits, they have to also enter their pin/////
//////////implement megas/////////



var newMon = new ocapmon(
{
	_id: Math.random(),
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
		removepool = movesIn;
		reprevo = prevoIn;
		reevo = evoIn;
		reflavor = flavorIn;
		err = "A Mon with that name already exists.";
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
		removepool = "";
		reprevo = "";
		reevo = "";
		reflavor = "";
		err = null;
		console.log(err);
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