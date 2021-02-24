// when we create firebase function project then we get to use it. 
const functions = require("firebase-functions");
const express = require("express");

// cors is for security purpus, when data pass through front-end to backend communication
const cors = require("cors");

// this is stripe secret key
const stripe = require("stripe")(
  "sk_test_51HPvU9DFg5koCdLGeOEiFvwHat4v8eMjX6SY0YCwxPBQBUPhKy1fPVhiSM5cQtgW7QBG9ydQcXnW57TDxVE2f3H000HSfmEQZF"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

// we create a post request in axios.js file when user click get buy through credit card
app.post("/payments/create", async (request, response) => {
  // we extract total value from query parameter
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  // here we request to stripe for payment
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // when payment complete we send to front-end user secret for which we can complete payment process.
  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api