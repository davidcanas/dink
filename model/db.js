
/*
 * GET users listing.
 */

var Mongoose = require('mongoose');
var shortId = require('shortid');

var db = Mongoose.connection;

db.on('error', console.error);
db.once('open', function() {

});

Mongoose.connect('mongodb+srv://DanithanBot:david2021@danicluster.rkt3t.mongodb.net/Datafbase?retryWrites=true&w=majority');

var SiteSchema = new Mongoose.Schema({

    site: {
      type: String,
   
      }, 
    newLink: {
      type:String,
      unique: true,
      'default': shortId.generate
      },
  stats: {
    visits: Number,
    
  },
  creatorIP: {
    type: "string",
      default: "no-ip"
  }

});

var Site = Mongoose.model('Site', SiteSchema);
