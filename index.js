
require("dotenv").config();


const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const PORT = 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
// console.log(process.env.STRIPE_PRIVATE_KEY);
app.get("/", (req, res) => {
  res.send("abebe");
});

app.post("/payments/create", async (request, response) => {
  // const total = Math.round(request.query.total * 100);

  const total = request.query.total;

  console.log("total amount ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
  console.log(`http://localhost:${PORT}/`);
});
