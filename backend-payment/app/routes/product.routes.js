module.exports = (app) => {
  const database = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Retrieve all Products

  router.post("/create", database.insertPayment);

  app.use("/api/payment", router);
};
