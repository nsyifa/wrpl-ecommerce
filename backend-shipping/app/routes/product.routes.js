module.exports = (app) => {
  const database = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Retrieve all Products

  router.get("/snap", database.getSnap);

  router.post("/rajaongkir", database.getShippingInfo);

  app.use("/api/shipping", router);
};
