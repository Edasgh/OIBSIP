import React, { useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import crustImg from "../../assets/pexels-polina-tankilevitch-4109128.jpg";


const Card = () => {
  
  const [quantity, setQuantity] = useState(1);
  return (
    <Link className="link" to="/" >
      <div className="card">
        <div className="images">
          <img src={crustImg}  alt=""  className="mainImg"/>
        </div>
        <h2>Hello title</h2>
        <div className="prices">
          <h3 className="oldPrice">$600</h3>
          <h3 className="price">$350</h3>
        </div>
        <div className="button-container">

          
          <div className="quantity">
            <button
              className="minus"
              onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="plus"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button className="add-to-cart card-btn poppins-semibold" title="add to cart" style={{display:"flex",justifyContent:"center",alignItems:"center",gap:".6rem",fontSize:"1rem"}}>
           Add to Cart <i className="fa-solid fa-cart-shopping cart-icon"></i>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;