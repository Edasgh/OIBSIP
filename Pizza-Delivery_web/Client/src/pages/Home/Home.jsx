import React from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import Products from '../Products/Products';
import Card from '../../components/Card/Card';


const Home = () => {
  return (
    <>
    <Header />
    <Products/>
    <h1>Hello this is homepage</h1>
    </>
  )
}

export default Home