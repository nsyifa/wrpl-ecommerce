const Database = require("../models/product.model.js");

exports.getCustomerByEmail = (req, res) => {
  Database.getCustomerByEmail(req.query.email, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customer.",
      });
    else res.send(data);
  });
};

exports.getCustomerByCustId = (req, res) => {
  Database.getCustomerByCustId(req.query.cust_id, (err, data) => {
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

exports.getLatestOrder = (req, res) => {
  Database.getLatestOrder((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving order.",
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
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    city: req.body.city || null,
    country: "Indonesia",
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

exports.updateCustomerAddress = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Database.updateCustomerAddress(
    req.query.cust_id,
    req.query.new_address,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found customer with cust_id ${req.query.cust_id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating customer with cust_id ${req.query.cust_id}.`,
          });
        }
      } else res.send(data);
    }
  );
};
