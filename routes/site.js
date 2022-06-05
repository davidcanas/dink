var Mongoose = require('mongoose');
	
var requestIp = require('request-ip');

exports.criar = async function(req, res){

  var Site = Mongoose.model('Site');
  a = req.param('site');
 console.log(a)
  Site.findOne({newLink: a},function(err, link){
if(!link) return res.status(404).send(`<style>body{        
    background-color: #008cff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;        
    color:#fff;
}    
.container{
    margin: 0 auto;
    max-width: 800px;
}
.sad-face{
    font-size: 120px;
}    
.upper{
    font-size:28px;
}
.lower{
    font-size: 16px;
}</style><body><div class="container"><div class="sad-face">:(</div>    <p class="upper">Um erro ocorreu e não conseguimos encontrar <code>${a}</code> na nossa base de dados</p><p class="lower">Caso se trate de um erro contacte Canas#0734.</p></div></body>`)
    if (err) return console.error(err);
    res.redirect(link.site);
  });


};

exports.gerar = async function(req,res){

  var Site = Mongoose.model('Site');
const regex = new RegExp("^[a-zA-Z0-9_-]*$", "gi")

  if (!regex.test(req.body.newLink)) {

 return res.render("index_err", {erro: "O código do link não pode ter simbolos especiais"})
  }

  if(req.body.site === "" || !req.body.site.includes(".") || req.body.site.includes("dink") || req.body.site.includes("bitly")) {
    return res.render("index_err", {erro:"Insira um URL válido"})
  }
if(!req.body.site.startsWith("https://") && !req.body.site.startsWith("http://")) return res.render("index_err", {erro:"O url deve começar com https:// ou http://"})
 
  let verifyExist = await Site.findOne({newLink: req.body.newLink})
  if(verifyExist) return res.render("index_err",{erro:"Um URL com esse código já existe..."})
  var clientIp = requestIp.getClientIp(req);
  var link = new Site({
    site: req.body.site,
    newLink: req.body.newLink,
    creatorIP: clientIp
  });

  link.save(function(err, data) {

  if (err) return console.error(err);
  res.render("site", {site: req.body.site, codigo: data.newLink});

});

}
