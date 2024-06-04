import React from 'react';
import "./Products.css";
import vegImg from "../../assets/california-veggie-pizza-feature.jpg";
import nonVegPizzaImg from "../../assets/pexels-leonardo-luz-338722550-14000428.jpg";
import crustImg from "../../assets/pexels-polina-tankilevitch-4109128.jpg";
import toppingImg from "../../assets/veg-toppings.jpg";
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';



const Products = () => {
  const Categories = [
    {
      id:0,
      bgImg: vegImg,
      title: "Veg Pizzas",
      link: "/"
    },
    {
      id:1,
      bgImg: nonVegPizzaImg,
      title: "Non Veg Pizzas",
      link: "/product"
    },
    {
      id:2,
      bgImg: crustImg,
      title: "Pizza Crusts",
      link: "/"
    },
    {
      id:3,
      bgImg: toppingImg,
      title: "Pizza Toppings",
      link: "/"
    },
    {
      id:4,
      bgImg:"https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=600",
      title:"Order a Custom Pizza",
      link:"/"
    }
  ]
  return (
    <div className='main-div'>
      <h1 className='poppins-semibold section-title'>Our Menu</h1>
      <div className="product-categories">
        {Categories && Categories.map(c => {
          return (
            <Link to={c.link} key={c.id}>
              <div className="category-badge" style={{ backgroundImage: `url(${c.bgImg})` }}>
                <h3 className='poppings-medium badge-title'>{c.title}</h3>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="flex-container">
    <Card/>
    <Card/>
    <Card/>
    </div>


    </div>
  )
}

export default Products