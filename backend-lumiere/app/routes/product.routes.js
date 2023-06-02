module.exports = (app) => {
  const database = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Retrieve all Products
  router.get("/products", database.getAllProducts);

  router.post("/transaction", database.insertTransaction);

  app.use("/api/lumiere", router);
};
