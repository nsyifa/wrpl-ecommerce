const sql = require("./db.js");

// constructor
const Database = function (database) {
  // this.product_id = product.product_id;
  // this.name = product.name;
  // this.price = product.price;
  // this.stock = product.stock;
  // this.rating = product.rating;
  // this.weight = product.weight;
  // this.dimensions = product.dimensions;
  // this.color = product.color;
  // this.age = product.age;
  // this.category = product.category;
  // this.brand = product.brand;
};

Database.insertPayment = (
  fraud_status,
  gross_amount,
  order_id,
  payment_type,
  pdf_url,
  status_code,
  status_message,
  transaction_id,
  transaction_status,
  transaction_time,
  result
) => {
  sql.query(
    "CALL spInsertPayment(?,?,?,?,?,?,?,?,?,?)",
    [
      fraud_status,
      gross_amount,
      order_id,
      payment_type,
      pdf_url,
      status_code,
      status_message,
      transaction_id,
      transaction_status,
      transaction_time,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created payment: ", {
        fraud_status: fraud_status,
        gross_amount: gross_amount,
        order_id: order_id,
        payment_type: payment_type,
        pdf_url: pdf_url,
        status_code: status_code,
        status_message: status_message,
        transaction_id: transaction_id,
        transaction_status: transaction_status,
        transaction_time: transaction_time,
      });
      result(null, {
        fraud_status: fraud_status,
        gross_amount: gross_amount,
        order_id: order_id,
        payment_type: payment_type,
        pdf_url: pdf_url,
        status_code: status_code,
        status_message: status_message,
        transaction_id: transaction_id,
        transaction_status: transaction_status,
        transaction_time: transaction_time,
      });
    }
  );
};

module.exports = Database;
