import React from 'react';
import knife from "../images/knife1.jpg";
import knife2 from "../images/knife2.jpg";
import knife3 from "../images/knife3.jpg";
import "../styles/style.css";

const ImageSlider = () => {
    return (
        <div className="carouselBlock">
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                            className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={knife} className="d-block w-100 position-absolute top-50 start-50 translate-middle" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={knife2} className="d-block w-100 position-absolute top-50 start-50 translate-middle" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={knife3} className="d-block w-100 position-absolute top-50 start-50 translate-middle" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>

    );
};

export default ImageSlider;