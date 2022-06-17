import React from 'react';
import "../styles/style.css";

class ItemCard extends React.Component {
    constructor(props) {
        super(props);
        this.openOverlay = this.openOverlay.bind(this);
    }

    render() {
        return <div className="itemsBlock__itemCard text-center">
            <img src={this.props.image} alt="..." style={{maxWidth: "100%", height: 160}}/>
            <div className="card-body">
                <p>{this.props.title}</p>
                <h4>{this.props.price}</h4>
            </div>
            <div className="card-hidden">
                <button className="btn btn-dark" onClick={this.openOverlay}>Купити</button>
            </div>
        </div>;
    }

    //разом із відриттям корзини кнопкою покупки, оновлюється вміст корзини і зберігається у local storage (типу кукіс,
    // почитай в js на метаніті)
    openOverlay = () => {
        const users = {
            db_id: this.props.db_id,
            title: this.props.title,
            price: this.props.price,
            image: this.props.image,
            count: 1,
            max_count: this.props.max_count
        };
        let basketItems = JSON.parse(localStorage.getItem("basketItems"));

        if (basketItems === null) {
            basketItems = [];
            basketItems.push(users);
            localStorage.setItem("basketItems", JSON.stringify(basketItems));
        } else {
            let i = 0;
            for (i; i < basketItems.length; i++) {
                if (basketItems[i].db_id === this.props.db_id) {
                    basketItems[i].count += 1;
                    break;
                }
            }
            if (i >= basketItems.length) {
                basketItems.push(users);
            }
            localStorage.setItem("basketItems", JSON.stringify(basketItems));
        }

        //це колбек функція, яка викликає функцію батька: в цьому випадку оновлює в Body вміст кошика
        this.props.updateBasketCallback();

        document.getElementById("overlay").classList.remove("overlay-hide");
        document.getElementsByTagName("body")[0].classList.add("noscroll");
    }
}

export default ItemCard;