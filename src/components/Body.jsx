import ImageSlider from "./ImageSlider";
import React from "react";
import CategoriesLine from "./CategoriesLine";
import ItemsBlock from "./ItemsBlock";
import "../styles/style.css";

const Body = () => {
    return (
        <div className="body">
            <ImageSlider/>
            <CategoriesLine/>
            <ItemsBlock/>
        </div>
    );
};

export default Body;

