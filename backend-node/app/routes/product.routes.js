module.exports = (app) => {
  const database = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Retrieve all Products
  router.get("/products", database.getAllProducts);

  router.post("/customers", database.createCustomer);

  router.get("/customers/latest", database.getLatestCustomer);

  router.get("/customers/email/:email", database.getCustomerFromEmail);

  router.get("/cart", database.getCustomerCartProducts);

  router.put("/cart/update", database.updateCartQuantity);

  router.post("/cart/add", database.addCartQuantity);

  router.delete("/cart/:cust_id/:product_id", database.deleteCart);

  app.use("/api/data", router);
};
