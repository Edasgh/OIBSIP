import React, { useEffect, useState } from 'react'
import "./Carousel.css";

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const data = [
        "https://images.pexels.com/photos/20422130/pexels-photo-20422130/free-photo-of-pizza-on-plate.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/6493112/pexels-photo-6493112.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1049620/pexels-photo-1049620.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/1435903/pexels-photo-1435903.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ];

  
    useEffect(() => {
        setTimeout(
          () =>
            setCurrentSlide((current) =>
              current === data.length - 1 ? 0 : current + 1
            ),
          3800
        );
    
        return () => {};
      }, [currentSlide])
    return (
        <>
            <div className="carousel">
                <div className="container" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
                    <img src={data[0]} alt="Kindle-and-other-notepads" />
                    <img src={data[1]} alt="makeup-essentials" />
                    <img src={data[2]} alt="branded-bags" />
                    <img src={data[3]} alt="Sunglasses" />
                    <img src={data[4]} alt="casual-shoes" />
                    <img src={data[5]} alt="kids-fashion" />
                </div>
            </div>
        </>
    )
}

export default Carousel