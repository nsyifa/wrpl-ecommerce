module.exports = (app) => {
  const database = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Retrieve all Products

  router.post("/rajaongkir", database.getShippingInfo);

  router.get("/latest", database.getLatestShipping);

  router.post("/create", database.insertShipping);

  app.use("/api/shipping", router);
};
