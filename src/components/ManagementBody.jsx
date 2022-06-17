import React from "react";
import "../styles/style.css";
import Basket from "./Basket";
import LoginForm from "./LoginForm";
import {Link, Route, Routes} from "react-router-dom";


class ManagementBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {basketItems: JSON.parse(localStorage.getItem("basketItems")), categories: [{Title: "none"}]};
        this.changeBg = this.changeBg.bind(this);
        this.updateBasket = this.updateBasket.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    componentDidMount() {
        fetch(
            "http://localhost/php/getdata.php", {
                method: "POST",
                body: JSON.stringify({action: 'categories'})
            }
        ).then(response => response.text()
        ).then(responseText => {
            let data = JSON.parse(responseText);
            this.setState({categories: data})
        })
    }

    render() {
        return <div className="body">
            <Basket basketItems={this.state.basketItems} updateBasketCallback={this.updateBasket}/>
            <LoginForm/>
            <div className="container row m-0">
                <div className="col-3 position-sticky checkout-sticky">
                    <Link to="/management/products"
                          className="cabinet-list__item text-decoration-none text-dark d-block h6"
                          onClick={this.changeBg}>
                        Список товарів
                    </Link>
                    <Link to="/management/add-product"
                          className="cabinet-list__item text-decoration-none text-dark d-block h6"
                          onClick={this.changeBg}>
                        Додати товар
                    </Link>
                </div>
                <div className="col-9">
                    <Routes>
                        <Route path="/products" element={<div></div>}/>
                        <Route path="/add-product" element={<div className="py-2">
                            <form onSubmit={this.addProduct} noValidate>
                                <div><p className="text-danger d-none" id="result-text">ейейей</p></div>
                                <div className="row g-3 px-3 pb-4">
                                    <div className="col">
                                        <label htmlFor="title" className="form-label">Назва товару</label>
                                        <input type="text" className="form-control" id="title" aria-label="Назва товару"
                                               required/>
                                        <div className="invalid-feedback">
                                            Не має бути пустим.
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="category" className="form-label">Категорія</label>
                                        <select className="form-select" id="category" aria-label="Категорія"
                                                defaultValue="-1" onChange={this.validateForm} required>
                                            <option value="-1">Оберіть категорію</option>
                                            {this.state.categories.map(item => <option key={item.Title}
                                                value={item.Title}>{item.Title}</option>)}
                                        </select>
                                        <div className="invalid-feedback">
                                            Потрібно обрати категорію.
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-3 px-3 pb-4">
                                    <div className="col">
                                        <label htmlFor="price" className="form-label">Ціна</label>
                                        <div className="input-group">
                                            <input type="number" className="form-control"
                                                   id="price" aria-label="Ціна" onChange={this.validateForm}
                                                   min="0" max="100000" step="0.1" defaultValue="0" required/>
                                            <span className="input-group-text">грн</span>
                                            <div className="invalid-feedback">
                                                Ціна має бути більшою за 0.
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col">
                                        <label htmlFor="weight" className="form-label">Вага</label>
                                        <div className="input-group">
                                            <input type="number" className="form-control"
                                                   id="weight" aria-label="Вага" onChange={this.validateForm}
                                                   min="0" max="200000" step="0.1" defaultValue="0" required/>
                                            <span className="input-group-text">г.</span>
                                            <div className="invalid-feedback">
                                                Вага має бути більшою за 0.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="in_stock" className="form-label">Кількість на складі</label>
                                        <div className="input-group">
                                            <input type="number" className="form-control" id="in_stock"
                                                   aria-label="Кількість на складі"
                                                   min="0" max="10000" step="1" defaultValue="0" required/>
                                            <span className="input-group-text">шт.</span>
                                        </div>
                                        <div className="invalid-feedback">
                                            Не має бути пустим.
                                        </div>
                                    </div>
                                </div>
                                <div className="row px-3 pb-4">
                                    <div className="col">
                                        <label htmlFor="formFile" className="form-label">Фото товару</label>
                                        <input className="form-control" type="file" id="photo"
                                               accept=".png, .jpg, .jpeg" onChange={this.validateForm}/>
                                        <div className="invalid-feedback">
                                            Потрібно обрати фото одного з форматів: jpg, jpeg, png.
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <button className="btn btn-dark" type="submit">Додати товар</button>
                                </div>
                            </form>
                        </div>}/>
                    </Routes>
                </div>
            </div>
        </div>;
    }

    addProduct(event) {
        event.preventDefault();
        event.target.className += " was-validated";

        this.validateForm();

        if (!event.target.checkValidity()) {
            return;
        }

        let title = document.getElementById("title").value;
        let category = document.getElementById("category").value;
        let price = document.getElementById("price").value;
        let weight = document.getElementById("weight").value;
        let in_stock = document.getElementById("in_stock").value;
        let photo = document.getElementById("photo").files[0];

        let formData = new FormData();
        formData.append("photo", photo);
        formData.append("data", JSON.stringify({title, category, price, weight, in_stock}));

        fetch(
            "http://localhost/php/addproduct.php", {
                method: "POST",
                body: formData
            }
        ).then(response => response.text()
        ).then(responseText => {
            if (responseText === "success") {
                this.showResult("Новий продукт успішно додано", true);
            } else {
                this.showResult("При додаванні продукту виникла помилка", false);
            }
        })
    }

    validateForm(): boolean {
        let price = document.getElementById("price");
        let weight = document.getElementById("weight");
        let category = document.getElementById("category");
        let file = document.getElementById("photo").files;

        if (price.value <= 0) {
            price.setCustomValidity("Invalid field.");
        } else {
            price.setCustomValidity("");
        }

        if (weight.value <= 0) {
            weight.setCustomValidity("Invalid field.");
        } else {
            weight.setCustomValidity("");
        }

        if (parseInt(category.value) === -1) {
            category.setCustomValidity("Invalid field.");
        } else {
            category.setCustomValidity("");
        }

        if (file.length === 0 || !['image/jpeg', 'image/jpg', 'image/png'].includes(file[0].type)) {
            document.getElementById("photo").setCustomValidity("Invalid field.");
        } else {
            document.getElementById("photo").setCustomValidity("");
        }
    }

    showResult(text, success) {
        let el = document.getElementById("result-text");
        el.textContent = text;
        el.classList.remove("d-none");
        if (success) {
            el.classList.remove("text-danger");
            el.classList.add("text-success");
        } else {
            el.classList.add("text-danger");
            el.classList.remove("text-success");
        }
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
            if (isChangedCount) {
                window.alert("Кількість товарів на складі є меншою за таку у кошику. Перегляньте зміни у кошику.");
            }
            this.setState({basketItems: basketItems});
        })

    }
}

export default ManagementBody;

