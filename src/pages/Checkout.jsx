import React from 'react';
import "../styles/style.css";
import Header from "../components/Header";
import CheckoutBody from "../components/CheckoutBody";

function Checkout() {
    return (
        <div className="App">
            <div className="container-fluid col-md-10">
                <Header/>
                <CheckoutBody/>
            </div>
        </div>);
}

export default Checkout;