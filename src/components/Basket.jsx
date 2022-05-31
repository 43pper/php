import React from 'react';
import "../styles/style.css";
import Counter from "./Counter";
import {Link} from "react-router-dom"

class Basket extends React.Component {
    constructor(props) {
        super(props);

        if (this.props === null || this.props.basketItems === null) {
            this.state = {basketItems: []};
        } else {
            this.state = {basketItems: this.props.basketItems};
        }

        this.closeOverlay = this.closeOverlay.bind(this);
    }

    //щоб при оновлення пропсів, оновилися state і за ними дочірні елементи
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state === prevState) {
            this.setState({basketItems: this.props.basketItems});
        }
    }

    render() {
        //обчислення суми покупок: прив'язую до this.state, бо в усі дочірні елементи, пов'язані зі state автоматично змінюються
        let basketTable = this.state.basketItems.length !== 0 ? <table className="table align-middle text-center">
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">Кількість</th>
                <th scope="col">Вартість</th>
            </tr>
            </thead>
            <tbody>
            {this.state.basketItems.map((item, index) => <tr className="table-row" key={item.db_id}>
                <td>
                    <div className="basket-pic">
                        <img src={item.image} alt="pic"/>
                    </div>
                </td>
                <td>
                    {item.title}
                </td>
                <td>
                    <Counter count={item.count} bd_id={item.db_id} index={index} max_count={item.max_count}
                             updateQuantityCallback={() => this.props.updateBasketCallback()}/>
                </td>
                <td>
                    <div className="position-relative">
                        {item.count * item.price}
                        <div className="basket__delete-icon">
                            <button type="button" className="btn btn-outline-dark"
                                    onClick={() => this.deleteBasketItem(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                     fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>)}
            </tbody>
        </table> : <div>Тут поки-що пусто</div>;
        if (this.props.onlyTable === true) {
            return basketTable;
        } else {
            let sum = 0;
            for (let i = 0; i < this.state.basketItems.length; i++) {
                sum += this.state.basketItems[i].count * this.state.basketItems[i].price;
            }
            return <div className="overlay overlay-hide" id="overlay">
                <div className="half-visible" onClick={this.closeOverlay}>

                </div>
                <div className="container-md modal-container basket-container bg-white">
                    <div className="container pb-3">
                        <div className="row justify-content-between align-items-center py-1">
                            <div className="col align-items-end">
                                <span className="h2">Кошик</span>
                            </div>
                            <div className="col p-3 text-end">
                                <button type="button" className="btn-close btn-outline-light" aria-label="Close"
                                        onClick={this.closeOverlay}></button>
                            </div>
                        </div>
                        {basketTable}
                        <div className="text-end">
                            <span className="d-block pb-3">Всього: {sum} грн</span>
                            {this.state.basketItems.length !== 0 ?
                                <Link className="btn btn-dark" to="/checkout" onClick={this.closeOverlay}>Оформити
                                    замовлення</Link> :
                                <button className="btn btn-dark" disabled>
                                    Оформити замовлення</button>}
                        </div>
                    </div>
                </div>
            </div>;
        }
    }

    closeOverlay() {
        document.getElementById("overlay").classList.add("overlay-hide");
        document.getElementsByTagName("body")[0].classList.remove("noscroll");
    }

    deleteBasketItem(index) {
        if (window.confirm("Ви впевнені,що хочете видалити товар з кошика?")) {
            let basketItems = JSON.parse(localStorage.getItem("basketItems"));
            basketItems.splice(index, 1);
            localStorage.setItem("basketItems", JSON.stringify(basketItems));
            this.props.updateBasketCallback();
        }
    }
}

export default Basket;