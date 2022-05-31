import React from 'react';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: props.count, max_count: props.max_count};
        this.manualChange = this.manualChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //якщо змінились пропси
        if (this.props.count !== prevProps.count && this.props.count !== this.state.count) {
            this.setState({count: this.props.count});
        }
        if (this.props.max_count !== prevProps.max_count && this.props.max_count !== this.state.max_count) {
            this.setState({max_count: this.props.max_count});
        }
        //якщо змінився стейт
        else if (this.state !== prevState) {
            this.saveChanges()
        }
    }

    render() {
        return <div>
            <div className="_icon-minus _black-icon d-inline-block counter-block" onClick={() => this.change(-1)}></div>
            <div className="d-inline-block counter-block"><input type="number" className="number-input text-center"
                                                                 value={this.state.count} onChange={this.manualChange}/>
            </div>
            <div className="_icon-plus _black-icon d-inline-block counter-block" onClick={() => this.change(1)}></div>
        </div>
    }

    //функція щоб змінювати плюсом і мінусом
    change(change_var) {
        if (this.state.count === 1 && change_var === -1) {
            this.setState({count: 1});
            return;
        }
        if (this.state.count === this.state.max_count && change_var === 1) {
            this.setState({count: this.state.max_count});
            return;
        }
        this.setState({count: this.state.count + change_var});
    }

    //функція щоб змінювати ручками
    manualChange(event) {
        let num = parseInt(event.target.value);
        if (isNaN(num) || num < 1) {
            num = 1;
        } else if (num > this.state.max_count) {
            num = this.state.max_count;
        }
        this.setState({count: num});
    }

    //функція що кожного разу, при зміні лічильника, оновлює localStorage. Думав що це надто неефективно, але на інших
    //сайтах і так кожного разу запит на сервер посилається, тож норм. Якщо швидко змінювати значення, то корзини лагають
    //і на тому сайті, і на Розеткі
    saveChanges() {
        let basketItems = JSON.parse(localStorage.getItem("basketItems"));
        basketItems[this.props.index].count = this.state.count;
        localStorage.setItem("basketItems", JSON.stringify(basketItems));
        this.props.updateQuantityCallback(this.state.count, this.props.index);
    }
}

export default Counter;