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

exports.getCustomerFromCustId = (req, res) => {
  Database.getCustomerFromCustId(req.query.cust_id, (err, data) => {
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

exports.getLatestPayment = (req, res) => {
  Database.getLatestPayment((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving payment.",
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

// get customer cart info from cust_id
exports.getCustomerCartProducts = (req, res) => {
  console.log(req.query, "HI");
  const cust_id = req.query.cust_id;
  if (!cust_id) {
    return res.status(400).send({
      message: "cust_id parameter is required",
    });
  }

  Database.getCustomerCartProducts(cust_id, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cart info.",
      });
    }
    res.send(data);
  });
};

exports.updateCartQuantity = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Database.updateCartQuantity(
    req.query.cust_id,
    req.query.product_id,
    req.query.quantity,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found cart with cust_id ${req.query.cust_id} and product_id ${req.query.product_id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating cart with id with cust_id ${req.query.cust_id} and product_id ${req.query.product_id}.`,
          });
        }
      } else res.send(data);
    }
  );
};

exports.addCartQuantity = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req);

  Database.addCartQuantity(
    req.body.cust_id,
    req.body.product_id,
    req.body.add_quantity,
    (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating the cart.",
        });
      else res.send(data);
    }
  );
};

exports.deleteCart = (req, res) => {
  Database.deleteCart(
    req.params.cust_id,
    req.params.product_id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found cart with cust_id ${req.params.cust_id} and product_id ${req.params.product_id}.`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete cart with id " + req.params.cust_id,
          });
        }
      } else res.send({ message: `Cart was deleted successfully!` });
    }
  );
};

exports.insertPayment = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Database.insertPayment(
    req.body.payment_id,
    req.body.payment_type,
    (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while inserting payment.",
        });
      else res.send(data);
    }
  );
};

exports.insertOrder = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Database.insertOrder(
    req.body.order_number,
    req.body.cust_id,
    req.body.shipper_id,
    req.body.payment_id,
    req.body.ship_date,
    req.body.status,
    (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while inserting order.",
        });
      else res.send(data);
    }
  );
};

exports.insertOrderDetail = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Database.insertOrderDetail(
    req.body.order_number,
    req.body.product_id,
    req.body.quantity,
    req.body.total_price,
    (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while inserting order detail.",
        });
      else res.send(data);
    }
  );
};

exports.getAllShippers = (req, res) => {
  Database.getAllShippers((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving shippers.",
      });
    else res.send(data);
  });
};
