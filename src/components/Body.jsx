import ImageSlider from "./ImageSlider";
import React from "react";
import CategoriesLine from "./CategoriesLine";
import ItemsBlock from "./ItemsBlock";
import "../styles/style.css";
import Basket from "./Basket";

const Body = () => {
    return (
        <div className="body">
            <ImageSlider/>
            <CategoriesLine/>
            <ItemsBlock/>
            <Basket/>
        </div>
    );
};

export default Body;

