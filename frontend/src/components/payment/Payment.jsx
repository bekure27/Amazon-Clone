import { Link, useNavigate } from "react-router-dom";
import "./Payment.css";
import { useStateValue } from "../../context/Context";
import CheckoutProduct from "../Checkout/CheckoutProduct";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { useEffect, useState } from "react";
import axios from "../../utils/axios-baseURL"
import { db } from "../../utils/firebase-config";


const Payment = () => {
   const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();
   const stripe = useStripe();
const elements = useElements();
const [error, setError] = useState(null);
 const [disabled, setDisabled] = useState(true);
 const [succeeded, setSucceeded] = useState(false);
 const [processing, setProcessing] = useState("");
 const [clientSecret, setClientSecret] = useState(true);

// //  const getBasketTotal = (basket) =>
// //    basket.reduce((amount, item) => item.price + amount, 0);

const getBasketTotal =  (basket) => {
  const total =  basket.reduce((amount, item) => item.price + amount, 0);
  // console.log("Total Calculation:", total);
  return total;
};


  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
       
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders");
      });
  };



  useEffect(() => {
    const getClientSecret = async () => {
    
   const getBasketTotal = (basket) => {
     const total = basket.reduce((amount, item) => item.price + amount, 0);
     // console.log("Total Calculation:", total);
     return total;
   };
   const total = getBasketTotal(basket);


      const response = await axios({
        method: "post",
        url: `/payments/create?total=${total * 100}`,
        // url: `/payments/create?total=${100 * 100}`,
      });
     
      setClientSecret(response.data.clientSecret);
      
    };

    getClientSecret();
  }, [basket]);



// console.log('print client secrte ',clientSecret)

useEffect(() => {
  console.log("print client secret:", clientSecret);
}, [clientSecret]);

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>demo Address</p>
            <p>demo city</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item, index) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total:{value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
