const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/cardrank', { useNewUrlParser: true });

const cardsSchema = {
   name: String,
   issuer: String,
   apr: String,
   Fee: String,
   travel: String,
   dining: String,
   other: String,
}

const Card = mongoose.model('Card', cardsSchema);

app.post('/form', (req, res) => {
   let newCard = new Card({
      name: req.body.name,
      issuer: req.body.issuer,
      apr: req.body.name,
      Fee: req.body.name,
      travel: req.body.name,
      dining: req.body.name,
      other: req.body.name,
   });
   newCard.save();
   res.redirect('/');
});

app.get('/', (req, res) => {
   Card.find({}, function (err, cards) {
      res.render('index', {
         cardsList: cards
      })
   })
})

app.listen(3000, function () {
   console.log('server is running');
})
