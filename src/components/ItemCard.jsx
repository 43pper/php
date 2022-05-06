import React from 'react';
import "../styles/style.css";

const ItemCard = (props) => {

    return (
        <div className="itemsBlock__itemCard">
            <p className="fw-bold text-center h2">{props.title}</p>
            <p className="fst-italic text-center h4">{props.image}</p>
            <p className="display-6 text-center text-warning ">{props.description}</p>
        </div>
    );
};

export default ItemCard;