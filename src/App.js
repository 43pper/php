import React from 'react';
import "./styles/style.css";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Main from "./pages/Main";
import Checkout from "./pages/Checkout";

class App extends React.Component{
    constructor() {
        super();
        this.state = {permissions: {checkout: false}}
        this.hasPermission = this.hasPermission.bind(this);
        this.hasPermission();
    }

    render() {
        return <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main changeAccountCallback={this.hasPermission}/>}></Route>
                <Route path="/checkout"
                       element={this.state.permissions.checkout ? <Checkout changeAccountCallback={this.hasPermission}/> :
                           <Navigate to="/"/>}></Route>
            </Routes>
        </BrowserRouter>;
    }
    hasPermission() : boolean{
        fetch("http://localhost/php/permissions.php")
            .then(response => response.text())
            .then(responseText => this.setState({permissions: JSON.parse(responseText)}));
    }
}

export default App;
