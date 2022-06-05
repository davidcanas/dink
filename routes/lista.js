var Mongoose = require('mongoose');

exports.listar = function(req, res){
  if(req.query.auth !== process.env.PASS) {
    return res.redirect("/")
  }
  var list = Mongoose.model('Site');
  list.find(function(err, dados){
    res.render('lista', {sites: dados, auth: process.env.PASS});
  });

}
