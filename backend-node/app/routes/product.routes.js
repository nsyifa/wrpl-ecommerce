module.exports = (app) => {
  const database = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Retrieve all Products
  router.get("/products", database.getAllProducts);

  router.get("/shippers", database.getAllShippers);

  router.post("/customers", database.createCustomer);

  router.get("/customers/latest", database.getLatestCustomer);

  router.get("/payments/latest", database.getLatestPayment);

  router.get("/orders/latest", database.getLatestOrder);

  router.get("/customers/email/:email", database.getCustomerFromEmail);

  router.get("/customers/cust_id", database.getCustomerFromCustId);

  router.put("/customer/address/update", database.updateCustomerAddress);

  router.get("/cart", database.getCustomerCartProducts);

  router.put("/cart/update", database.updateCartQuantity);

  router.post("/cart/add", database.addCartQuantity);

  router.delete("/cart/:cust_id/:product_id", database.deleteCart);

  router.post("/payments", database.insertPayment);

  router.post("/orders", database.insertOrder);

  router.post("/orderdetails", database.insertOrderDetail);

  router.get("/snap", database.getSnap);

  app.use("/api/data", router);
};
