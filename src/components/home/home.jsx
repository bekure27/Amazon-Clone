import { useState } from "react";
import "./home.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Products from "../Products/Products";
import generateID  from "../../utils/idGenrator.js";
const images = [
  "https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg",
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const slideRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="home__container">
        <div className="home__arrow left" onClick={slideLeft}>
          <ArrowBackIosIcon
            fontSize="large"
            sx={{
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
            }}
          />
        </div>
        <div  className="home__image__container">
          <img className="home__image" src={images[currentIndex]} alt="" />
        </div>

        <div className="home__arrow right" onClick={slideRight}>
          <ArrowForwardIosIcon
            fontSize="large"
            sx={{
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
            }}
          />
        </div>

        <div className="home__row">
          <Products
            id={generateID()}
            title="BRG Compatible with Airpods Pro Case"
            price={199.01}
            rating={4}
            image="https://m.media-amazon.com/images/I/51aW2FrB6VL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
          />
          <Products
            id={generateID()}
            title="Apple AirPods Pro (2nd Gen) Wireless Earbuds, Up to 2X More Active Noise Cancelling"
            price={19.01}
            rating={4}
            image="https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_UL320_.jpg"
          />
          <Products
            id={generateID()}
            title="Amazon Basics 48-Pack AA Alkaline High-Performance Batteries, 1.5 Volt, 10-Year Shelf Life"
            price={15.04}
            rating={4}
            image="https://m.media-amazon.com/images/I/81uBzbSP1+L._AC_UL320_.jpg"
          />
        </div>
        <div className="home__row">
          <Products
            id={generateID()}
            title="Texas Instruments TI-84 Plus CE Color Graphing Calculator, Black 7.5 Inch"
            price={120}
            rating={4}
            image="https://m.media-amazon.com/images/I/71yrLllDokL._AC_UL320_.jpg"
          />
          <Products
            id={generateID()}
            title="SanDisk 128GB Extreme microSDXC UHS-I Memory Card with Adapter - Up to 190MB/s, C10, U3, V30, 4K, 5K, A2, Micro"
            price={12.99}
            rating={4}
            image="https://m.media-amazon.com/images/I/71etcRZF-JL._AC_UL320_.jpg"
          />
          <Products
            id={generateID()}
            title="SanDisk 2TB Extreme Portable SSD - Up to 1050MB/s - USB-C, USB 3.2 Gen 2 - External Solid State Drive - SDSSDE61-2T00-"
            price={119.99}
            rating={4}
            image="https://m.media-amazon.com/images/I/51le1zIeIaL._AC_UL320_.jpg"
          />
        </div>
        <div className="home__row">
          <Products
            id={generateID()}
            title="DJI Mini 4 Pro Fly More Combo Plus with DJI RC 2 (Screen Remote Controller), Folding"
            price={1_154}
            rating={4}
            image="https://m.media-amazon.com/images/I/51l0mrdW+VL._AC_UL320_.jpg"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
