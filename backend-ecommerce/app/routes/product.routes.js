module.exports = (app) => {
  const database = require("../controllers/product.controller.js");

  var router = require("express").Router();

  router.get("/cart", database.getCustomerCart);

  router.put("/cart/update", database.updateCartQuantity);

  router.post("/cart/add", database.addCartQuantity);

  router.delete("/cart/:cust_id/:product_id", database.deleteCart);

  app.use("/api/ecommerce", router);
};
