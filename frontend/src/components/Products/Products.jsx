
import "./products.css";
import { useStateValue } from "../../context/Context";


const Products = ({ id, title, price, image, rating }) => {
  const [{ basket }, dispatch] = useStateValue();

// console.log(basket)

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <p key={index}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="image" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Products;
