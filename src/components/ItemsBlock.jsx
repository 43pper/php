import React from 'react';
import ItemCard from "./ItemCard";
import "../styles/style.css";

const ItemsBlock = (props) => {
    return (
        <div className="itemsBlock">
            {props.cards.map(item => <ItemCard title={item.title} description={item.description} image={item.image}/>)}
        </div>
    );
};
ItemsBlock.defaultProps = {cards: [{title: "title", description: "description", image: "image"}]};
export default ItemsBlock;