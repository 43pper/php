import React from 'react';
import "../styles/style.css";
import Counter from "./Counter";

class Basket extends React.Component {
    constructor(props) {
        super(props);

        if(this.props === null || this.props.basketItems === null){
            this.state = {basketItems: [{bd_id: "", title: "", price: "", image: "", count: 1}]};
        }
        else{
            this.state = {basketItems: this.props.basketItems};
        }

        this.closeOverlay = this.closeOverlay.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
    }

    //щоб при оновлення пропсів, оновилися state і за ними дочірні елементи
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state === prevState) {
            this.setState({basketItems: this.props.basketItems});
        }
    }

    render() {
        //обчислення суми покупок: прив'язую до this.state, бо в усі дочірні елементи, пов'язані зі state автоматично змінюються
        let sum = 0;
        for(let i = 0; i < this.state.basketItems.length; i++){
            sum += this.state.basketItems[i].count * this.state.basketItems[i].price;
        }

        return <div className="overlay overlay-hide" id="overlay">
            <div className="half-visible" onClick={this.closeOverlay}>

            </div>
            <div className="container-md modal-container bg-white">
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
                    <table className="table align-middle text-center">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">Кількість</th>
                            <th scope="col">Вартість</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.basketItems.map((item, index) =>
                            <tr>
                                <td>
                                    <div className="basket-pic">
                                        <img src={item.image} alt="pic"/>
                                    </div>
                                </td>
                                <td>
                                    {item.title}
                                </td>
                                <td>
                                    <Counter count={item.count} bd_id={item.bd_id} index={index} updateQuantityCallback={this.updateQuantity}/>
                                </td>
                                <td>
                                    {item.count * item.price}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <div className="text-end">
                        <span className="d-block pb-3">Всього: {sum} грн</span>
                        <button className="btn btn-dark">Оформити замовлення</button>
                    </div>
                </div>
            </div>
        </div>
            ;
    }

    closeOverlay(){
        document.getElementById("overlay").classList.add("overlay-hide");
        document.getElementsByTagName("body")[0].classList.remove("noscroll");
    }

    //оновлення кількості, яке викликається із counter-а, скопіював зі stackoverflow))
    updateQuantity(count, index){
        let basketItems = [...this.state.basketItems];
        let item = {...basketItems[index]};
        item.count = count;
        basketItems[index] = item;
        this.setState({basketItems});
    }
}

export default Basket;