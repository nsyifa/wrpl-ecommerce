const Database = require("../models/product.model.js");

// Retrieve all Products from the database (with no condition).
const axios = require("axios");

exports.getShippingInfo = (req, res) => {
  const options = {
    method: "POST",
    url: "https://api.rajaongkir.com/starter/cost",
    headers: {
      key: "cebede57946ae90275354d457c56888a",
      "content-type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams({
      origin: req.body.origin,
      destination: req.body.destination,
      weight: req.body.weight,
      courier: req.body.courier,
    }),
  };

  axios(options)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
};

exports.getLatestShipping = (req, res) => {
  Database.getLatestShipping((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving shipping.",
      });
    else res.send(data);
  });
};

exports.insertShipping = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Database.insertShipping(
    req.body.shipping_number,
    req.body.shipping_company,
    req.body.sender_name,
    req.body.sender_city,
    req.body.sender_address,
    req.body.receiver_name,
    req.body.receiver_city,
    req.body.receiver_address,
    req.body.shipping_type,
    req.body.product_weight,
    req.body.shipping_fee,
    (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while inserting shipping.",
        });
      else res.send(data);
    }
  );
};
