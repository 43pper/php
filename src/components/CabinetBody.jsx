import React from "react";
import "../styles/style.css";
import Basket from "./Basket";
import LoginForm from "./LoginForm";
import {Routes, Route, Link} from "react-router-dom";
import OrdersList from "./OrdersList";
import PersonalInformation from "./PersonalInformation";


class CheckoutBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {basketItems: JSON.parse(localStorage.getItem("basketItems"))};
        this.changeBg = this.changeBg.bind(this);
        this.updateBasket = this.updateBasket.bind(this);
        this.exit = this.exit.bind(this);
    }

    render() {
        return <div className="body">
            <Basket basketItems={this.state.basketItems} updateBasketCallback={this.updateBasket}/>
            <LoginForm/>
            <div className="container row m-0">
                <div className="col-3 position-sticky checkout-sticky">
                    <Link to="/cabinet/personal-information"
                          className="cabinet-list__item text-decoration-none text-dark d-block h6"
                          onClick={this.changeBg}>
                        Ваші дані
                    </Link>
                    <Link to="/cabinet/orders" className="cabinet-list__item text-decoration-none text-dark d-block h6"
                          onClick={this.changeBg}>
                        Список замовлень
                    </Link>
                    <div className="text-end">
                        <button className="btn btn-outline-danger" onClick={this.exit}>Вийти з акаунту</button>
                    </div>
                </div>
                <div className="col-9">
                    <Routes>
                        <Route path="/orders" element={<OrdersList/>}/>
                        <Route path="/personal-information" element={<PersonalInformation/>}/>
                    </Routes>
                </div>
            </div>
        </div>;
    }

    changeBg(event) {
        let activeItems = document.getElementsByClassName("cabinet-list__item-active");
        for (let i = 0; i < activeItems.length; i++) {
            activeItems[i].classList.remove("cabinet-list__item-active");
        }
        event.target.classList.add("cabinet-list__item-active");
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

    exit(){
        if(!window.confirm("Ви впевнені що хочете вийти з акаунту?")) {
            return;
        }
        fetch("http://localhost/php/exit.php").then(response => response.text()).then(responseText => {
            if(responseText === "success"){
                window.location.href = '/';
            }
        })
    }
}

export default CheckoutBody;

