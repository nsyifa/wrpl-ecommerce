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

module.exports = Database;
