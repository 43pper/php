import React from "react";
import "../styles/style.css";

class OrdersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {orders: null};
    }

    componentDidMount() {
        this.updateList();
    }

    render() {
        const dayjs = require('dayjs');
        return <div className="accordion accordion-flush">
            {this.state.orders?.map(item => <div key={item.Id} className="accordion-item m-2 border">
                <h2 className="accordion-header" id={"panel-heading" + item.Id}>
                    <button className="accordion-button collapsed row m-0" type="button" data-bs-toggle="collapse"
                            data-bs-target={"#panels-collapse" + item.Id}>
                        <div className="row col-10">
                            <div className="col-4">
                                Замовлення №{item.Id}
                            </div>
                            <div className="col-4">
                                Статус: {item.Purchase_status === "DONE" ? "виконано"
                                : item.Purchase_status === "CANCELLED" ? "скасовано"
                                    : item.Purchase_status === "PROCESSED" ? "в обробці"
                                        : ""}
                            </div>
                            <div className="col-4">
                                {dayjs(item.Purchase_date).format('DD/MM/YYYY')}
                            </div>
                        </div>
                    </button>
                </h2>
                <div id={"panels-collapse" + item.Id} className="accordion-collapse collapse">
                    <div className="accordion-body">
                        <div className="row container m-0">
                            <div className="col-5">
                                <div className="row py-1 h6 border-bottom border-2">
                                    Інформація про замовлення
                                </div>
                                <div className="row py-1">
                                    {item.LastName + " " + item.FirstName + " " + item.MiddleName}
                                </div>
                                <div className="row py-1">
                                    {item.Phone}
                                </div>
                                <div className="row py-1">
                                    {item.Email}
                                </div>
                                <div className="row py-1">
                                    {item.SettlementName}
                                </div>
                                <div className="row py-1">
                                    {item.WarehouseName}
                                </div>
                            </div>
                            <div className="col-7">
                                <div>
                                    <div className="py-1 h6 border-bottom border-2">Товари</div>
                                    <table className="table align-middle">
                                        <tbody>
                                        {item.Products.map(item => <tr key={item.Id}>
                                                <td>
                                                    <img src={item.Image} alt="..." style={{maxHeight: 50}}/>
                                                </td>
                                                <td>
                                                    {item.Title}
                                                </td>
                                                <td>
                                                    {item.Quantity}
                                                </td>
                                                <td>
                                                    {item.Price * item.Quantity} грн.
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                    <div className="text-end h6">
                                        Всього: {item.Sum} грн.
                                    </div>
                                </div>
                            </div>
                        </div>
                        {item.Purchase_status === "PROCESSED"
                            ? <div className="container m-0 text-end">
                                <button className="btn btn-outline-dark"
                                        onClick={() => this.cancelOrder(item.Id)}>Скасувати замовлення
                                </button>
                            </div>
                            : <div></div>}
                    </div>
                </div>
            </div>)}
        </div>;
    }

    cancelOrder(purchase_id) {
        if (!window.confirm("Ви впевнені що хочете скасувати замовлення?")) {
            return;
        }
        fetch(
            "http://localhost/php/orders.php", {
                method: "POST",
                body: JSON.stringify({action: 'delete', purchase_id})
            }
        ).then(response => response.text()
        ).then(responseText => {
            if (responseText === "success") {
                this.updateList();
                window.alert("Замовлення успішно скасовано.");
            }
        })
    }

    updateList() {
        fetch(
            "http://localhost/php/getdata.php", {
                method: "POST",
                body: JSON.stringify({action: 'purchases'})
            }
        ).then(response => response.text()
        ).then(responseText => {
            let orders = JSON.parse(responseText);
            for (let i = 0; i < orders.length; i++) {
                let prices = orders[i].Products.map(item => item.Price * item.Quantity);
                prices.length > 1 ? orders[i].Sum = prices.reduce((a, b) => a + b) : orders[i].Sum = prices[0];
            }
            this.setState({orders: orders})
        });
    }
}

export default OrdersList;