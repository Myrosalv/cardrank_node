const { request, response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { Schema } = mongoose;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/cardrank', { useNewUrlParser: true });

const cardsSchema = new Schema({
   name: { type: String, index: true },
   issuer: { type: String, index: true },
   apr: String,
   Fee: { type: String, index: true },
   travel: String,
   dining: String,
   other: String,
});

cardsSchema.index({ name: 1, issuer: 1, Fee: 1 });
const Card = mongoose.model('Card', cardsSchema);

app.post('/form', async (req, res) => {
   try {
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
   } catch (error) {
      res.status(500).json({
         success: false,
         error
      });
   }

   res.status(200).json({
      success: true
   });
});

app.post('/getCard', async (req, res) => {
   const payload = req.body.payload.trim();
   const search = await Card.find({ name: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();
   //const search = await Card.find({ $text: { $search: payload } });

   res.send({ payload: search });
});

app.get('/', (req, res) => {
   Card.find({}, (err, cards) => {
      res.render('index', {
         cardsList: cards
      })
   })
})


app.listen(3000, function () {
   console.log('server is running');
})
