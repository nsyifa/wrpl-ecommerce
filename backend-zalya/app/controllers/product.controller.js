const Database = require("../models/product.model.js");

// Retrieve all Products from the database (with no condition).
exports.getAllProducts = (req, res) => {
  Database.getAllProducts((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    else res.send(data);
  });
};

exports.insertTransaction = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Database.insertTransaction(
    req.body.transaction_id,
    req.body.payment_type,
    req.body.cust_id,
    req.body.product_id,
    req.body.quantity,
    req.body.unit_price,
    req.body.total_price,
    (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while inserting transaction.",
        });
      else res.send(data);
    }
  );
};
