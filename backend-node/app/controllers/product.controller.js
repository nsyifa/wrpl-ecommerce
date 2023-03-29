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

exports.getCustomerFromEmail = (req, res) => {
  Database.getCustomerFromEmail(req.query.email, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customer.",
      });
    else res.send(data);
  });
};

exports.getLatestCustomer = (req, res) => {
  Database.getLatestCustomer((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customer.",
      });
    else res.send(data);
  });
};

exports.createCustomer = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req);
  // Create a Customer
  const customer = {
    cust_id: req.body.cust_id,
    cust_name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    country: req.body.country || null,
    city: req.body.city || null,
    address: req.body.address || null,
  };

  // Save Customer in the database
  Database.createCustomer(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the customer.",
      });
    else res.send(data);
  });
};

// get customer cart info from cust_id
exports.getCustomerCartProducts = (req, res) => {
  console.log(req.query, "HI");
  Database.getCustomerCartProducts(req.query.cust_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cart info.",
      });
    else res.send(data);
  });
};
