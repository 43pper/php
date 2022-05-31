import ImageSlider from "./ImageSlider";
import React from "react";
import CategoriesLine from "./CategoriesLine";
import ItemsBlock from "./ItemsBlock";
import "../styles/style.css";
import Basket from "./Basket";
import LoginForm from "./LoginForm";

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {basketItems: JSON.parse(localStorage.getItem("basketItems"))};
        this.updateBasket = this.updateBasket.bind(this);
    }

    render() {
        return <div className="body">
            <ImageSlider/>
            <CategoriesLine/>
            <ItemsBlock updateBasketCallback={this.updateBasket}/>
            <Basket basketItems={this.state.basketItems} updateBasketCallback={this.updateBasket}/>
            <LoginForm changeAccountCallback={() => this.props.changeAccountCallback()}/>
        </div>;
    }

    updateBasket() {
        let basketItems = JSON.parse(localStorage.getItem("basketItems"));
        let isChangedCount = false;
        fetch(
            "http://localhost/php/getdata.php", {
                method: "POST",
                body: JSON.stringify({
                    action: "quantity",
                    products: basketItems.map(item => item.db_id)
                })
            }).then(response => response.text()).then(responseText => {
            let products_with_count = JSON.parse(responseText);
            for (let i = 0; i < products_with_count.length; i++) {
                for (let j = 0; j < basketItems.length; j++) {
                    if (basketItems[j].db_id === products_with_count[i].Id) {

                        basketItems[j].max_count = products_with_count[i].CountInStock;

                        if (basketItems[j].max_count < basketItems[j].count) {
                            if (basketItems[j].max_count === 0) {
                                basketItems.splice(j, 1);
                            } else {
                                basketItems[j].count = basketItems[j].max_count;
                            }
                            isChangedCount = true;
                        }

                        break;
                    }
                }
            }
            if (isChangedCount){
                window.alert("Кількість товарів на складі є меншою за таку у кошику. Перегляньте зміни у кошику.");
            }
            this.setState({basketItems: basketItems});
        })

    }
}

export default Body;

