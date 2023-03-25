const Database = require("../models/product.model.js");

// Retrieve all Products from the database (with no condition).
exports.getAllProducts = (req, res) => {
  Database.getAllProducts((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    else res.send(data);
  });
};
