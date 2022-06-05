const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const favicon = require('serve-favicon');
const Mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');
const site = require('./routes/site');
const http = require('http');
const path = require('path');
const lista = require('./routes/lista');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());



const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 10 
});

app.use(limiter);
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get("/admin/delete/:url", async (req,res) =>{
 const bancodb =  Mongoose.model('Site');
  if(req.query.auth !== process.env.PASS) return res.redirect("/")
   const link = await bancodb.findOne({newLink: req.params.url})
  if(!link) return res.send("O link não existe")
  await bancodb.findOneAndDelete({newLink: req.params.url})
  res.send("Url deletado com sucesso")
})
app.get('/', routes.index);
app.get('/admin/lista', lista.listar);
app.post('/', site.gerar);
app.get('/:site', site.criar);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Servidor ligado na porta' + app.get('port'));
});
