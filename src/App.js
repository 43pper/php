import React from 'react';
import "./styles/style.css";
import {BrowserRouter, Route} from "react-router-dom";
import Main from "./pages/Main";
import Cart from "./pages/Cart";

function App() {
    return (
        <BrowserRouter>
            <Route path="/">
                <Main/>
            </Route>
            <Route path="/cart">
                <Cart/>
            </Route>
        </BrowserRouter>
    )
}

export default App;
