const sql = require("./db.js");

// constructor
const Database = function (database) {};

Database.getAllProducts = (result) => {
  sql.query("SELECT * FROM product_cosmetic", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }

    console.log("products:", res);
    result(null, res);
  });
};

Database.insertTransaction = (
  order_number,
  transaction_id,
  payment_type,
  cust_id,
  product_id,
  quantity,
  unit_price,
  total_price,
  result
) => {
  sql.query(
    "CALL spInsertTransaction(?,?,?,?,?,?,?,?)",
    [
      order_number,
      transaction_id,
      payment_type,
      cust_id,
      product_id,
      quantity,
      unit_price,
      total_price,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created transaction: ", {
        order_number: order_number,
        transaction_id: transaction_id,
        payment_type: payment_type,
        cust_id: cust_id,
        product_id: product_id,
        quantity: quantity,
        unit_price: unit_price,
        total_price: total_price,
      });
      result(null, {
        order_number: order_number,
        transaction_id: transaction_id,
        payment_type: payment_type,
        cust_id: cust_id,
        product_id: product_id,
        quantity: quantity,
        unit_price: unit_price,
        total_price: total_price,
      });
    }
  );
};

module.exports = Database;
