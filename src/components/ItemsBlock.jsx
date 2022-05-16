import React from 'react';
import ItemCard from "./ItemCard";
import "../styles/style.css";

class ItemsBlock extends React.Component{
    constructor(props) {
        super(props);
        this.updateBasketCallback = this.updateBasketCallback.bind(this);
    }
    render() {
        return <div className="itemsBlock position-relative">
                {this.props.cards.map(item => <ItemCard title={item.title} price={item.price} image={item.image}
                                                   bd_id={item.bd_id}
                                                   updateBasketCallback={this.updateBasketCallback}/>)}
            </div>
        ;
    }
    updateBasketCallback(){
        this.props.updateBasketCallback();
    }
}
export default ItemsBlock;