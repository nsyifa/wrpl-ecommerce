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

Database.getAllProducts = (result) => {
  sql.query("CALL spShowProducts()", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }

    console.log("products:", res);
    result(null, res);
  });
};

Database.getLatestCustomer = (result) => {
  sql.query("CALL spGetLatestCustomer()", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }

    console.log("customer:", res);
    result(null, res);
  });
};

Database.getCustomerFromEmail = (email, result) => {
  sql.query(`CALL spGetCustomerFromEmail('${email}')`, email, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }

    console.log("customer:", res);
    result(null, res);
  });
};

Database.createCustomer = (newCustomer, result) => {
  sql.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Database.getCustomerCartProducts = (cust_id, result) => {
  sql.query(
    `CALL spGetCustomerCartProducts('${cust_id}')`,
    cust_id,
    (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err);
        return;
      }

      console.log("cart info:", res);
      result(null, res);
    }
  );
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
    "INSERT into cart(cust_id,product_id,quantity) VALUES(?, ?,?) ON DUPLICATE KEY UPDATE quantity=quantity+?",
    [cust_id, product_id, add_quantity, add_quantity],
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
