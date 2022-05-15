import React from 'react';
import "../styles/style.css";

const ItemCard = (props) => {
    return (
        <div className="itemsBlock__itemCard text-center">
            <img src={props.image} alt="..." style={{width: "100%"}}/>
                <div className="card-body">
                    <p>{props.title}</p>
                    <h4>{props.price}</h4>
                </div>
                <div className="card-hidden">
                    <button className="btn btn-dark" onClick={() => openOverlay()}>Купити</button>
                </div>
        </div>
    );
};
function openOverlay(){
    document.getElementById("overlay").classList.remove("overlay-hide");
    document.getElementsByTagName("body")[0].classList.add("noscroll");
}
export default ItemCard;