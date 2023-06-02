const sql = require("./db.js");

// constructor
const Database = function (database) {};

Database.getCustomerCart = (cust_id, result) => {
  sql.query(`SELECT * from cart where cust_id = ?`, cust_id, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }

    console.log("cart info:", res);
    result(null, res);
  });
};

Database.updateCartQuantity = (cust_id, product_id, quantity, result) => {
  sql.query(
    "UPDATE cart SET quantity = ? WHERE cust_id = ? and product_id = ?",
    [quantity, cust_id, product_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated cart: ", {
        cust_id: cust_id,
        product_id: product_id,
        quantity: quantity,
      });
      result(null, {
        cust_id: cust_id,
        product_id: product_id,
        quantity: quantity,
      });
    }
  );
};

//INSERT into cart(cust_id,product_id,quantity) VALUES('CB01250', 'PR69109',2)
//ON DUPLICATE KEY UPDATE quantity=quantity+1;

Database.addCartQuantity = (cust_id, product_id, add_quantity, result) => {
  sql.query(
    "CALL spUpdateCart1(?,?,?)",
    [cust_id, product_id, add_quantity],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("updated cart: ", {
        cust_id: cust_id,
        product_id: product_id,
        quantity: add_quantity,
      });
      result(null, {
        cust_id: cust_id,
        product_id: product_id,
        quantity: add_quantity,
      });
    }
  );
};

Database.deleteCart = (cust_id, product_id, result) => {
  sql.query(
    "DELETE FROM cart WHERE cust_id = ? AND product_id = ?",
    [cust_id, product_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found cart with the conditions
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(
        "deleted cart with cust_id and product_id: ",
        cust_id,
        product_id
      );
      result(null, res);
    }
  );
};

Database.getAllSellers = (result) => {
  sql.query("SELECT * FROM seller", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }

    console.log("sellers:", res);
    result(null, res);
  });
};

Database.getLatestOrder = (result) => {
  sql.query("CALL spGetLatestOrder()", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }

    console.log("order:", res);
    result(null, res);
  });
};

Database.insertOrder = (
  order_number,
  cust_id,
  total_payment,
  transaction_id,
  result
) => {
  sql.query(
    "CALL spInsertOrders(?,?,?,?)",
    [order_number, cust_id, total_payment, transaction_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created order: ", {
        order_number: order_number,
        cust_id: cust_id,
        total_payment: total_payment,
        transaction_id: transaction_id,
      });
      result(null, {
        order_number: order_number,
        cust_id: cust_id,
        total_payment: total_payment,
        transaction_id: transaction_id,
      });
    }
  );
};

Database.insertOrderPerSeller = (
  order_number,
  cust_id,
  seller_id,
  shipping_id,
  payment_amount,
  result
) => {
  sql.query(
    "CALL spInsertOrderPerSeller(?,?,?,?,?)",
    [order_number, cust_id, seller_id, shipping_id, payment_amount],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created order per seller: ", {
        order_number: order_number,
        cust_id: cust_id,
        seller_id: seller_id,
        shipping_id: shipping_id,
        payment_amount: payment_amount,
      });
      result(null, {
        order_number: order_number,
        cust_id: cust_id,
        seller_id: seller_id,
        shipping_id: shipping_id,
        payment_amount: payment_amount,
      });
    }
  );
};

Database.insertOrderDetail = (
  order_number,
  product_id,
  quantity,
  total_price,
  result
) => {
  sql.query(
    "CALL spInsertOrderDetails(?,?,?,?)",
    [order_number, product_id, quantity, total_price],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created order detail: ", {
        order_number: order_number,
        product_id: product_id,
        quantity: quantity,
        total_price: total_price,
      });
      result(null, {
        order_number: order_number,
        product_id: product_id,
        quantity: quantity,
        total_price: total_price,
      });
    }
  );
};

module.exports = Database;
