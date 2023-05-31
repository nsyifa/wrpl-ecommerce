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

Database.getLatestCustomer = (result) => {
  sql.query(
    "SELECT * FROM customer ORDER BY cust_id DESC LIMIT 1;",
    (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err);
        return;
      }

      console.log("customer:", res);
      result(null, res);
    }
  );
};

Database.getCustomerByEmail = (email, result) => {
  sql.query(`CALL spGetCustomerByEmail(?)`, email, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }

    console.log("customer:", res);
    result(null, res);
  });
};

Database.getCustomerByCustId = (cust_id, result) => {
  sql.query(`CALL spGetCustomerByCustId(?)`, cust_id, (err, res) => {
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

Database.updateCustomerAddress = (cust_id, new_address, result) => {
  sql.query(
    "CALL spUpdateCustomerAddress(?,?)",
    [cust_id, new_address],
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

      console.log("updated customer address: ", {
        cust_id: cust_id,
        address: new_address,
      });
      result(null, {
        cust_id: cust_id,
        address: new_address,
      });
    }
  );
};

module.exports = Database;
