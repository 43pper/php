import React from 'react';
import ItemCard from "./ItemCard";
import "../styles/style.css";

const ItemsBlock = () => {


    return (
        <div className="itemsBlock">
            <ItemCard title="item1" description="description1" image="image1"/>
            <ItemCard title="item2" description="description2" image="image2"/>
            <ItemCard title="item3" description="description3" image="image3"/>
            <ItemCard title="item4" description="description4" image="image4"/>
            <ItemCard title="item5" description="description5" image="image5"/>
            <ItemCard title="item6" description="description6" image="image6"/>
            <ItemCard title="item7" description="description7" image="image7"/>
            <ItemCard title="item8" description="description8" image="image8"/>
            <ItemCard title="item9" description="description9" image="image9"/>
            <ItemCard title="item10" description="description10" image="image10"/>
        </div>
    );
};

export default ItemsBlock;