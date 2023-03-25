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
  sql.query("SELECT * FROM products", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }

    console.log("products:", res);
    result(null, res);
  });
};

module.exports = Database;
