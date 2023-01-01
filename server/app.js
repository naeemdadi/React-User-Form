const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const usersRouter = require("./routers/users");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Set up a whitelist and check against it:
const isDomainAllowed = (origin, domains) => {
  let isAllowed = false;
  domains?.forEach(domain => {
    if (origin?.includes(domain)) {
      isAllowed = true;
    }
  });
  return isAllowed;
};
var corsOptionsDelegate = function (req, callback) {
  const allowlist = ["react-user-form.netlify.app", "localhost"];
  var corsOptions;
  if (isDomainAllowed(req?.header('Origin'), allowlist)) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
app.use(express.json());

// Connect database
const url = process.env.MONGODB_URL;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use(usersRouter);

// Starts the server
app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
