//jshint esversion: 6
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://admin-anik:07Anik12Admin19@cluster0-pksfb.mongodb.net/ninja-graphql', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log('db connected');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen('4000', () => console.log('Server listening at 4000'));