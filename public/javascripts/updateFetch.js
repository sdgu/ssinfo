var mongo = require("mongodb");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ssinfo");
var db = mongoose.connection;


var collection = mongoose.model("ocapmon", ocapmonSchema, "ocap");


function fetch()
{
	alert("test");
	collection.find({},{}, function(e, docs)
	{
		alert(docs);
	});
}