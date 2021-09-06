require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// routes
const productRoute = require('./API/product/routes');

// middleware
app.use(express.json());
app.use('/products', productRoute);

// runnig the app
const run = async () => {
  // connect to db
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (error) {
    console.error('Error in connecting to Database', error);
  }
  console.log('Connecting to Database Successfully');
  // running the server
  app.listen(process.env.PORT || 8000, () =>
    console.log('The server is running on port 8000')
  );
};

run();
