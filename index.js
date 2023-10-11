
require("dotenv").config();


const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const PORT = 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "https://amazon-b2t.netlify.app",
  })
);

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "https://amazon-b2t.netlify.app");
  res.setHeader("Access-Control-Allow-Origin", " http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});


const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
// console.log(process.env.STRIPE_PRIVATE_KEY);
app.get("/", (req, res) => {
  res.send("abebe");
});

app.post("/payments/create", async (request, response) => {
  // const total = Math.round(request.query.total * 100);

  const total = request.query.total;
if (total ){
  console.log("total amount ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });

}
else {
    response.status(200).send({
      message: "i'cant process payment ",
    });
}

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
  console.log(`http://localhost:${PORT}/`);
});
