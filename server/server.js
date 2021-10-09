const { request, response } = require('express');
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

app.post('/form', async (req, res) => {
   let newCard = new Card({
      name: req.body.name,
      issuer: req.body.issuer,
      apr: req.body.apr,
      Fee: req.body.Fee,
      travel: req.body.travel,
      dining: req.body.dining,
      other: req.body.other,
   });
   newCard.save();

   const cards = await Card.find({});
   res.status(200).json(cards);
});

app.get('/', (req, res) => {
   Card.find({}, (err, cards) => {
      res.render('index', {
         cardsList: cards
      })
   })
})

app.get('/search', async (req, res) => {

});

app.listen(3000, function () {
   console.log('server is running');
})
