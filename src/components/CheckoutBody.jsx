import React from "react";
import "../styles/style.css";
import Basket from "./Basket";
import LoginForm from "./LoginForm";
import CityChooser from "./CityChooser";
import WarehouseChooser from "./WarehouseChooser";
import {Link, Route, Routes} from "react-router-dom";

class CheckoutBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {basketItems: JSON.parse(localStorage.getItem("basketItems"))};
        this.updateBasket = this.updateBasket.bind(this);
        this.updateCityState = this.updateCityState.bind(this);
        this.updateWarehouseState = this.updateWarehouseState.bind(this);
        this.sendOrder = this.sendOrder.bind(this);
    }

    render() {
        let sum = 0;
        for (let i = 0; i < this.state.basketItems.length; i++) {
            sum += this.state.basketItems[i].count * this.state.basketItems[i].price;
        }
        return <div className="body">
            <Basket basketItems={this.state.basketItems} updateBasketCallback={this.updateBasket}/>
            <LoginForm/>
            <Routes>
                <Route path="/" element={<form id="checkout-form" onSubmit={this.sendOrder} noValidate>
                    <div className="container row">
                        <div className="col-9">
                            <div className="border-bottom border-dark p-2">
                                <h2>Кошик</h2>
                            </div>
                            <div className="px-3 py-4">
                                <Basket basketItems={this.state.basketItems}
                                        updateBasketCallback={this.updateBasket}
                                        onlyTable={true}/>
                            </div>
                            <div className="border-bottom border-dark p-2">
                                <h2>Ваші контактні дані</h2>
                            </div>
                            <div className="px-3 py-4">
                                <div className="row g-3">
                                    <div className="col">
                                        <label htmlFor="surname" className="form-label">Прізвище</label>
                                        <input type="text" className="form-control" id="surname"
                                               aria-label="Прізвище"
                                               required/>
                                        <div className="invalid-feedback">
                                            Не має бути пустим.
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="first_name" className="form-label">Ім'я</label>
                                        <input type="text" className="form-control" id="first_name"
                                               aria-label="Ім'я"
                                               required/>
                                        <div className="invalid-feedback">
                                            Не має бути пустим.
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="middle-name" className="form-label">По батькові</label>
                                        <input type="text" className="form-control" id="middle_name"
                                               aria-label="По батькові" required/>
                                        <div className="invalid-feedback">
                                            Не має бути пустим.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 pb-4">
                                <div className="row g-3">
                                    <div className="col">
                                        <label htmlFor="phone" className="form-label">Мобільний телефон</label>
                                        <input type="text" className="form-control" id="phone"
                                               aria-label="Мобільний телефон" required/>
                                        <div className="invalid-feedback">
                                            Будь ласка, введіть номер телефону.
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="email" className="form-label">Електронна пошта</label>
                                        <input type="text" className="form-control" id="email"
                                               aria-label="Електронна пошта"
                                               required/>
                                        <div className="invalid-feedback">
                                            Будь ласка, введіть електронну пошту.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 pb-4">
                                <div className="row g-3">
                                    <div className="col">
                                        <CityChooser updateParentStateCallback={this.updateCityState}/>
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 pb-4">
                                <div className="row g-3">
                                    <div className="col">
                                        <WarehouseChooser active={this.state.isCityValid}
                                                          cityRef={this.state.cityRef}
                                                          updateParentStateCallback={this.updateWarehouseState}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container col-3 position-sticky border checkout-sticky">
                            <div className="p-1 pt-2"><h4>Підсумок</h4></div>
                            <div className="p-1">
                                <table className="table table-sm">
                                    <tbody>
                                    {this.state.basketItems.map(item => <tr key={item.db_id}>
                                        <td>{item.title}</td>
                                        <td>{item.count} шт.</td>
                                    </tr>)}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row p-2">
                                <div className="col-7"><strong>Всього</strong></div>
                                <div className="col-5"><strong>{sum} грн</strong></div>
                            </div>
                            <div className="p-2 text-center">
                                <button className="btn btn-dark" type="submit">Підтвердити замовлення</button>
                            </div>
                        </div>
                    </div>
                </form>}/>
                <Route path="/order-success" element={<div>
                    <div className="container h4 p-3">
                        Замовлення успішно оформлене
                    </div>
                    <div className="container">
                        <Link className="btn btn-dark" to="/cabinet/orders">Переглянути всі
                            замовлення</Link>
                    </div>
                </div>}/>
            </Routes>
        </div>;
    }

    sendOrder(event) {
        event.preventDefault();
        event.target.className += " was-validated";

        if (!this.state.isCityValid) {
            document.getElementById("city").setCustomValidity("Invalid field.");
            document.getElementById("city-feedback").textContent = "Будь ласка, оберіть місто доставки зі списку.";
            return;
        } else {
            document.getElementById("city").setCustomValidity("");
        }
        if (!this.state.isWarehouseValid) {
            document.getElementById("warehouse").setCustomValidity("Invalid field.");
            document.getElementById("warehouse-feedback").textContent = "Будь ласка, оберіть відділення доставки зі списку.";
            return;
        } else {
            document.getElementById("warehouse").setCustomValidity("");
        }

        if (!event.target.checkValidity()) {
            return;
        }

        fetch("http://localhost/php/orders.php", {
            method: "POST", body: JSON.stringify({
                action: "create",
                surname: document.getElementById("surname").value,
                firstname: document.getElementById("first_name").value,
                middlename: document.getElementById("middle_name").value,
                phone: document.getElementById("phone").value,
                email: document.getElementById("email").value,
                cityRef: this.state.cityRef,
                warehouseRef: this.state.cityRef,
                cityName: this.state.city,
                warehouseName: this.state.warehouse,
                basketItems: JSON.parse(localStorage.getItem("basketItems"))
            })
        }).then(response => response.text()).then(responseText => {
            if (responseText === "success") {
                localStorage.setItem("basketItems", JSON.stringify([]));
                window.location.href = 'checkout/order-success';
            } else if (responseText === "not_enough_in_stock") {
                this.updateBasket();
            }

        });
    }

    updateBasket() {
        let basketItems = JSON.parse(localStorage.getItem("basketItems"));
        let isChangedCount = false;
        fetch("http://localhost/php/getdata.php", {
            method: "POST", body: JSON.stringify({
                action: "quantity", products: basketItems.map(item => item.db_id)
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
            if (isChangedCount) {
                window.alert("Кількість товарів на складі є меншою за таку у кошику. Перегляньте зміни у кошику.");
            }
            this.setState({basketItems: basketItems});
        })

    }

    updateCityState(city, cityRef, isCityValid) {
        this.setState({city: city, cityRef: cityRef, isCityValid: isCityValid});
    }

    updateWarehouseState(warehouse, warehouseRef, isWarehouseValid) {
        this.setState({warehouse: warehouse, warehouseRef: warehouseRef, isWarehouseValid: isWarehouseValid});
    }
}

export default CheckoutBody;

