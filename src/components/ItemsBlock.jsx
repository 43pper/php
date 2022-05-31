import React from 'react';
import ItemCard from "./ItemCard";
import "../styles/style.css";

class ItemsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cards: [{db_id: "11", title: "title", price: "111", image: "/images/knife1.jpg", max_count: 0}]};
        this.updateBasketCallback = this.updateBasketCallback.bind(this);
    }

    componentDidMount() {
        fetch(
            "http://localhost/php/getdata.php", {
                method: "POST",
                body: JSON.stringify({action: 'products'})
            }
        ).then(response => response.text()).then(responseText => this.setState({cards: JSON.parse(responseText)}));
    }

    render() {
        return <div className="itemsBlock position-relative">
            {this.state.cards.map(item => <ItemCard key={item.db_id} title={item.title} price={item.price}
                                                    image={item.image}
                                                    db_id={item.db_id} max_count={item.max_count}
                                                    updateBasketCallback={this.updateBasketCallback}/>)}
        </div>
            ;
    }

    updateBasketCallback() {
        this.props.updateBasketCallback();
    }
}

export default ItemsBlock;