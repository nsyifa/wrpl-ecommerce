module.exports = (app) => {
  const database = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Retrieve all Products

  router.post("/new", database.createCustomer);

  router.get("/latest", database.getLatestCustomer);

  router.get("/email/:email", database.getCustomerByEmail);

  router.get("/customers/cust_id", database.getCustomerByCustId);

  router.put("/customer/address/update", database.updateCustomerAddress);

  app.use("/api/customer", router);
};
