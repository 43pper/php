import React from 'react';
import "../styles/style.css";
import Header from "../components/Header";
import Body from "../components/Body";

function Main(props) {
    return (
        <div className="App">
            <div className="container-fluid col-md-10">
                <Header/>
                <Body changeAccountCallback={() => props.changeAccountCallback()}/>
            </div>
        </div>);
}

export default Main;
