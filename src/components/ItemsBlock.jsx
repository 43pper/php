import React from 'react';
import ItemCard from "./ItemCard";
import "../styles/style.css";

const ItemsBlock = (props) => {
    return (
        <div className="itemsBlock position-relative">
            {props.cards.map(item => <ItemCard title={item.title} price={item.price} image={item.image}/>)}
        </div>
    );
};
ItemsBlock.defaultProps = {cards: [{title: "title", price: "price", image: "/images/knife1.jpg"}, {title: "title", price: "price", image: "/images/knife1.jpg"}, {title: "title", price: "price", image: "/images/knife1.jpg"}, {title: "title", price: "price", image: "/images/knife1.jpg"}]};
export default ItemsBlock;