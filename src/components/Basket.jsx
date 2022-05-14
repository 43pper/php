import React from 'react';
import "../styles/style.css";

const Basket = () => {
    return (
        <div className="overlay"  id="overlay">
            <div className="overlay half-visible" onClick={() => closeOverlay()}>

            </div>
            <div className="container modal-container bg-white">
                asdasd
            </div>
        </div>
    );
};
function closeOverlay(){
    document.getElementById("overlay").style.display = "none";
}
export default Basket;