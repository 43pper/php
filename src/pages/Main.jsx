import React from 'react';
import "./styles/style.css";
import Header from "../components/Header";
import Body from "../components/Body";

function Main() {
    return (
        <div className="App">
            <div className="container-fluid col-md-10">
                <Header/>
                <Body/>
            </div>
        </div>);
}

export default Main;
