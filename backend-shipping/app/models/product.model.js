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

Database.getLatestShipping = (result) => {
  sql.query("CALL spGetLatestShipping()", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }

    console.log("shipping:", res);
    result(null, res);
  });
};

Database.insertShipping = (
  shipping_number,
  shipping_company,
  sender_name,
  sender_city,
  sender_address,
  receiver_name,
  receiver_city,
  receiver_address,
  shipping_type,
  product_weight,
  shipping_fee,
  result
) => {
  sql.query(
    "CALL spInsertShipping(?,?,?,?,?,?,?,?,?,?,?)",
    [
      shipping_number,
      shipping_company,
      sender_name,
      sender_city,
      sender_address,
      receiver_name,
      receiver_city,
      receiver_address,
      shipping_type,
      product_weight,
      shipping_fee,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created shipping: ", {
        shipping_number: shipping_number,
        shipping_company: shipping_company,
        sender_name: sender_name,
        sender_city: sender_city,
        sender_address: sender_address,
        receiver_name: receiver_name,
        receiver_city: receiver_city,
        receiver_address: receiver_address,
        shipping_type: shipping_type,
        product_weight: product_weight,
        shipping_fee: shipping_fee,
      });
      result(null, {
        shipping_number: shipping_number,
        shipping_company: shipping_company,
        sender_name: sender_name,
        sender_city: sender_city,
        sender_address: sender_address,
        receiver_name: receiver_name,
        receiver_city: receiver_city,
        receiver_address: receiver_address,
        shipping_type: shipping_type,
        product_weight: product_weight,
        shipping_fee: shipping_fee,
      });
    }
  );
};

module.exports = Database;
