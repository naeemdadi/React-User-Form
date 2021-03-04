const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRouter = require('./routers/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Connect database
const url = process.env.MONGODB_URL
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(res => console.log("Connected to DB"))
.catch(err => console.log(err));

app.use(usersRouter);

// Starts the server
app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});