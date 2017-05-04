const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
   var now = new Date().toString();
   var log = `${now + ' ' + req.method + ' ' + req.url}`;

   console.log(log);

   fs.appendFile('server.log', log + '\n', (err) => {
      if (err) console.log(err);
   });

   next();
});

app.use((req, res, next) => {
   var x = Math.ceil(Math.random() * 10);

   if (x > 7) res.render('maintenance');

   next();
});

app.get('/', (req, res) => {
   res.render('home', {
      title : 'Homepage',
      msg   : 'Welcome to this epic page!'
   });
});

app.get('/about', (req, res) => {
   res.render('about', {
      pageTitle: 'About'
   });
});

app.listen(port, () => {
   console.log(`Serving app on port ${port}...`);
});
