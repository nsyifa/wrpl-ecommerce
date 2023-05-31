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

exports.getSnap = (req, res) => {
  midtransClient = require("midtrans-client");
  // Create Snap API instance
  let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: "SB-Mid-server-vTzqtjNj5C4pEfhGgm0PVsrY",
  });

  let parameter = {
    transaction_details: {
      order_id: "O233",
      gross_amount: 10000,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: "budi",
      last_name: "pratama",
      email: "budi.pra@example.com",
      phone: "08111222333",
    },
  };

  snap.createTransaction(parameter).then((transaction) => {
    // transaction token
    let transactionToken = transaction.token;
    let redirectUrl = transaction.redirect_url;
    console.log("transactionToken:", transactionToken);
    res.send({
      token: transactionToken,
      redirect_url: redirectUrl,
    });
  });
};
