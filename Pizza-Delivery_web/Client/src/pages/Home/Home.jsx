import React from 'react';
import "./Home.css";
import Carousel from '../../components/Carousel/Carousel';

const Home = () => {
  return (
  <>
   <div className="homepage">
        <Carousel/>
   <h1>Hello this is homepage</h1>
      </div>
   </>
  )
}

export default Home