import React from 'react';
import "./styles/style.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Checkout from "./pages/Checkout";
import Cabinet from "./pages/Cabinet"

class App extends React.Component {
    constructor() {
        super();
        this.state = {updateTrigger: false, permissions: {checkout: false}, login: document.cookie.match('(^|;)\\s*login\\s*=\\s*([^;]+)')?.pop() || ''}
        this.hasPermission = this.hasPermission.bind(this);
        this.update = this.update.bind(this);
    }

    render() {
        return <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main changeAccountCallback={this.update} login={this.state.login}/>}></Route>
                <Route path="/checkout/*"
                       element={this.hasPermission(['USER', 'MODERATOR']) ?
                           <Checkout changeAccountCallback={this.update} login={this.state.login}/> : <Navigate to="/"/>}></Route>
                <Route path="/cabinet/*" element={this.hasPermission(['USER', 'MODERATOR']) ?
                    <Cabinet changeAccountCallback={this.update} login={this.state.login}/> : <Navigate to="/"/>}></Route>
            </Routes>
        </BrowserRouter>;
    }

    hasPermission(possible_roles): boolean {
        return possible_roles.includes(document.cookie.match('(^|;)\\s*role\\s*=\\s*([^;]+)')?.pop() || '');
    }

    update() {
        this.setState({
            updateTrigger: !this.state.updateTrigger,
            login: document.cookie.match('(^|;)\\s*login\\s*=\\s*([^;]+)')?.pop() || ''
        });
    }
}

export default App;
