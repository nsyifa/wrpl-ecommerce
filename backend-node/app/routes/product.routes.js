module.exports = (app) => {
  const database = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Retrieve all Products
  router.get("/products", database.getAllProducts);

  router.post("/customers", database.createCustomer);

  router.get("/customers/latest", database.getLatestCustomer);

  router.get("/customers/email/:email", database.getCustomerFromEmail);

  app.use("/api/data", router);
};
