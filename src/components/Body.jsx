import ImageSlider from "./ImageSlider";
import React from "react";
import CategoriesLine from "./CategoriesLine";
import ItemsBlock from "./ItemsBlock";
import "../styles/style.css";
import Basket from "./Basket";
import LoginForm from "./LoginForm";
import {Link} from "react-router-dom";

class Body extends React.Component{
    constructor(props) {
        super(props);
        this.state = {basketItems: JSON.parse(localStorage.getItem("basketItems"))};
        this.updateBasket = this.updateBasket.bind(this);
    }
    render(){
        return <div className="body">
                <nav>
                    <Link to="/checkout">checkout</Link>
                </nav>
                <ImageSlider/>
                <CategoriesLine/>
                <ItemsBlock updateBasketCallback={this.updateBasket}/>
                <Basket basketItems={this.state.basketItems} updateBasketCallback={this.updateBasket}/>
                <LoginForm changeAccountCallback={() => this.props.changeAccountCallback()}/>
            </div>;
    }
    updateBasket(){
        let basketItems = JSON.parse(localStorage.getItem("basketItems"));
        this.setState({basketItems: basketItems});
    }
}

export default Body;

