const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/product.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
require("./app/routes/product.routes.js")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
