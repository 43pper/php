import ImageSlider from "./ImageSlider";
import React from "react";
import CategoriesLine from "./CategoriesLine";
import ItemsBlock from "./ItemsBlock";
import "../styles/style.css";
import Basket from "./Basket";

class Body extends React.Component{
    constructor(props) {
        super(props);
        this.state = {basketItems: JSON.parse(localStorage.getItem("basketItems"))};
        this.updateBasket = this.updateBasket.bind(this);
    }
    render(){
        let cards = [{bd_id: "11", title: "title", price: "111", image: "/images/knife1.jpg"},
                {bd_id: "12", title: "title", price: "111", image: "/images/knife1.jpg"},
                {bd_id: "13", title: "title", price: "111", image: "/images/knife1.jpg"},
                {bd_id: "14", title: "title", price: "111", image: "/images/knife1.jpg"},
                {bd_id: "15", title: "title", price: "111", image: "/images/knife1.jpg"}];
        return <div className="body">
                <ImageSlider/>
                <CategoriesLine/>
                <ItemsBlock cards={cards} updateBasketCallback={this.updateBasket}/>
                <Basket basketItems={this.state.basketItems}/>
            </div>;
    }
    updateBasket(){
        let basketItems = JSON.parse(localStorage.getItem("basketItems"));
        this.setState({basketItems: basketItems});
    }
}

export default Body;

