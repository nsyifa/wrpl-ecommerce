const Database = require("../models/product.model.js");

exports.insertPayment = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Database.insertPayment(
    req.body.fraud_status,
    req.body.gross_amount,
    req.body.order_id,
    req.body.payment_type,
    req.body.pdf_url,
    req.body.status_code,
    req.body.status_message,
    req.body.transaction_id,
    req.body.transaction_status,
    req.body.transaction_time,
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
