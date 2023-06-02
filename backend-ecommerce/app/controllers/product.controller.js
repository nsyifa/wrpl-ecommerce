const Database = require("../models/product.model.js");

// Retrieve all Products from the database (with no condition).
exports.getCustomerCart = (req, res) => {
  console.log(req.query, "HI");
  const cust_id = req.query.cust_id;
  if (!cust_id) {
    return res.status(400).send({
      message: "cust_id parameter is required",
    });
  }

  Database.getCustomerCart(cust_id, (err, data) => {
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

exports.getAllSellers = (req, res) => {
  Database.getAllSellers((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving sellers.",
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

exports.getSnap = (req, res) => {
  midtransClient = require("midtrans-client");
  // Create Snap API instance
  let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: "SB-Mid-server-vTzqtjNj5C4pEfhGgm0PVsrY",
  });

  snap.createTransaction(req.body).then((transaction) => {
    // transaction token
    let transactionToken = transaction.token;
    let redirectUrl = transaction.redirect_url;
    console.log("transactionToken:", transactionToken);
    res.send({
      token: transactionToken,
      redirect_url: redirectUrl,
    });
  });
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
    req.body.total_payment,
    req.body.transaction_id,
    (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while inserting order.",
        });
      else res.send(data);
    }
  );
};

exports.insertOrderPerSeller = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Database.insertOrderPerSeller(
    req.body.order_number,
    req.body.cust_id,
    req.body.seller_id,
    req.body.shipping_id,
    req.body.payment_amount,
    (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while inserting order per seller.",
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
