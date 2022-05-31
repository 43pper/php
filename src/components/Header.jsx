import React from 'react';
import {Link} from "react-router-dom"

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: this.props.login};
        this.openLoginForm = this.openLoginForm.bind(this);
        this.openOverlay = this.openOverlay.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if(this.props !== prevProps){
            this.setState({login: this.props.login});
        }
    }

    render() {
        return <div className="fixed-top header container-fluid col-md-10">
            <div className="header__column header__column_ col-md-5">

            </div>
            <Link className="header__column header__column_logo col-md-2 text-decoration-none text-white" to="/">
                LOGO
            </Link>
            <div className="header__column header__column_userBar col-md-5">
                <div className="userBar">
                    {this.state.login === "" ?
                        <div className="userBar__item col-md-2 _icon-user" onClick={this.openLoginForm}>

                        </div> :
                        <Link className="account col-md-2 row text-decoration-none text-white" to="/cabinet">
                            <div className="col text-white h6" style={{margin: "auto"}}>
                                {this.state.login}
                            </div>
                            <div className="col _icon-user">

                            </div>
                        </Link>}
                    <div className="userBar__item col-md-2 favourite _icon-like">

                    </div>
                    <div className="userBar__item col-md-2 cart _icon-cart" onClick={this.openOverlay}>

                    </div>
                </div>

            </div>
        </div>
    }

    openOverlay() {
        document.getElementById("overlay").classList.remove("overlay-hide");
        document.getElementsByTagName("body")[0].classList.add("noscroll");
    }

    openLoginForm() {
        document.getElementById("login-form").classList.remove("overlay-hide");
        document.getElementsByTagName("body")[0].classList.add("noscroll");
    }
}


export default Header;