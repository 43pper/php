import React from 'react';
import "./styles/style.css";
import Body from "./components/Body";
import Header from "./components/Header";

function App() {
    return (
        <div className="App">
            <div className="container-fluid col-md-10">
                <Header/>
                <Body/>
            </div>
        </div>);
}

export default App;
