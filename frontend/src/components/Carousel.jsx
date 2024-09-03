import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/Carousel.css';

const data = [
    {
        img: require('../images/img3.jpg')
    },
    {
        img: require('../images/beauti.jpg')
    },
    {
        img: require('../images/Selfcare-category.jpg')
    },
    {
        img: require('../images/bags.jpg')
    },
    {
        img: require('../images/Bamboo-category.jpg')
    },
];

function Carousel() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };
    
    return (
        <div className='carousel-container' style={{marginTop:"20"}}>
            <Slider {...settings}>
                {data.map((d, index) => (
                    <div key={index}>
                        <img src={d.img} alt={`Slide ${index}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Carousel;

// Carousel.jsx
// Displaying carousel.css.