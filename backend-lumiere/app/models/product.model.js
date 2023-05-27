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

module.exports = Database;
