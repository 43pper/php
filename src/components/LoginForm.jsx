import React from 'react';
import "../styles/style.css";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.closeLoginForm = this.closeLoginForm.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    render() {
        return <div className="overlay overlay-hide" id="login-form">
            <div className="half-visible" onClick={this.closeLoginForm}>

            </div>
            <div className="container-md modal-container login-container bg-white">
                <div className="container p-3">
                    <div className="row pb-3 justify-content-between align-items-center py-1">
                        <div className="col align-items-end">
                            <span className="h2">Вхід</span>
                        </div>
                        <div className="col text-end">
                            <button type="button" className="btn-close btn-outline-light" aria-label="Close"
                                    onClick={this.closeLoginForm}></button>
                        </div>
                    </div>
                    <form onSubmit={this.logIn}>
                        <div className="mb-3">
                            <label htmlFor="inputLoginEmail" className="form-label">Логін</label>
                            <input type="text" className="form-control" id="inputLoginUsername"
                                   aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputLoginPassword" className="form-label">Пароль</label>
                            <input type="password" className="form-control" id="inputLoginPassword"/>
                        </div>
                        <div><p className="text-danger d-none" id="login-error-text">ейейей</p></div>
                        <button type="submit" className="btn btn-dark">Увійти</button>
                    </form>
                </div>
            </div>
        </div>;
    }

    closeLoginForm() {
        document.getElementById("login-form").classList.add("overlay-hide");
        document.getElementsByTagName("body")[0].classList.remove("noscroll");
    }

    logIn(event) {
        event.preventDefault();
        let login = document.getElementById("inputLoginUsername").value;
        let password = document.getElementById("inputLoginPassword").value;
        fetch(
            "http://localhost/php/auth.php", {
                method: "POST",
                body: JSON.stringify({login: login, password: password})
            }
        ).then(response => response.text()).then(responseText => {
            if (responseText === "success") {
                this.props.changeAccountCallback();
                this.changeErrorVisibility(false);
                document.getElementById("inputLoginUsername").value = "";
                document.getElementById("inputLoginPassword").value = "";
                this.closeLoginForm();
            } else if (responseText === "invalid login") {
                this.changeErrorVisibility(true, "Користувача з даним логіном не знайдено");
            } else if (responseText === "invalid password") {
                this.changeErrorVisibility(true, "Введено хибний пароль");
            }
        });
    }

    changeErrorVisibility(makeVisible, text = "") {
        let addedClass = "d-none", removedClass = "d-block";
        if (makeVisible) {
            [addedClass, removedClass] = [removedClass, addedClass];
        }
        document.getElementById("login-error-text").textContent = text;
        document.getElementById("login-error-text").classList.add(addedClass);
        document.getElementById("login-error-text").classList.remove(removedClass);
    }
}

export default LoginForm;