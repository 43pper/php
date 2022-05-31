import React from "react";
import "../styles/style.css";

class PersonalInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            User_login: "",
            FirstName: "",
            LastName: "",
            Email: "",
            Phone: "",
            isDataEditing: false,
            isLoginEditing: false
        };
        this.changePassword = this.changePassword.bind(this);
        this.validatePasswords = this.validatePasswords.bind(this);
        this.changeLogin = this.changeLogin.bind(this);
        this.changePersonalInformation = this.changePersonalInformation.bind(this);
    }

    componentDidMount() {
        fetch(
            "http://localhost/php/getdata.php", {
                method: "POST",
                body: JSON.stringify({action: 'user'})
            }
        ).then(response => response.text()
        ).then(responseText => {
            let data = JSON.parse(responseText);
            this.setState({
                User_login: data.User_login,
                FirstName: data.FirstName,
                LastName: data.LastName,
                Email: data.Email,
                Phone: data.Phone
            })
        })
    }

    render() {
        return <div className="container">
            <div className="h5 p-2 m-0">Особисті дані</div>
            {this.state.isDataEditing
                ? <div className="p-2">
                    <div><p className="text-danger d-none" id="personal_data-result-text">ейейей</p></div>
                    <form onSubmit={this.changePersonalInformation} noValidate>
                        <div className="px-3 pb-4">
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="last_name" className="form-label">Прізвище</label>
                                    <input type="text" className="form-control" id="last_name" aria-label="Прізвище"
                                           defaultValue={this.state.LastName} required/>
                                    <div className="invalid-feedback">
                                        Не має бути пустим.
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="first_name" className="form-label">Ім'я</label>
                                    <input type="text" className="form-control" id="first_name" aria-label="Ім'я"
                                           defaultValue={this.state.FirstName} required/>
                                    <div className="invalid-feedback">
                                        Не має бути пустим.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 pb-4">
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="phone" className="form-label">Мобільний телефон</label>
                                    <input type="text" className="form-control" id="phone"
                                           aria-label="Мобільний телефон"
                                           defaultValue={this.state.Phone} required/>
                                    <div className="invalid-feedback">
                                        Будь ласка, введіть номер телефону.
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="email" className="form-label">Електронна пошта</label>
                                    <input type="text" className="form-control" id="email" aria-label="Електронна пошта"
                                           defaultValue={this.state.Email} required/>
                                    <div className="invalid-feedback">
                                        Будь ласка, введіть електронну пошту.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <button className="btn btn-dark" type="submit">Зберегти</button>
                            <button className="btn btn-outline-dark mx-3" type="button"
                                    onClick={() => this.setState({isDataEditing: false})}>Скасувати
                            </button>
                        </div>
                    </form>
                </div>
                : <div className="p-2">
                    <div className="px-3 py-4">
                        <div className="row g-3">
                            <div className="col">
                                <h6>Прізвище</h6>
                                <p>{this.state.LastName}</p>
                            </div>
                            <div className="col">
                                <h6>Ім'я</h6>
                                <p>{this.state.FirstName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-3 pb-4">
                        <div className="row g-3">
                            <div className="col">
                                <h6>Мобільний телефон</h6>
                                <p>{this.state.Phone}</p>
                            </div>
                            <div className="col">
                                <h6>Електронна пошта</h6>
                                <p>{this.state.Email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <button className="btn btn-dark"
                                onClick={() => this.setState({isDataEditing: true})}>Редагувати
                        </button>
                    </div>
                </div>}
            {this.state.isLoginEditing
                ? <div className="p-2">
                    <div><p className="text-danger d-none" id="login_change-result-text">ейейей</p></div>
                    <form onSubmit={this.changeLogin} noValidate>
                        <div className="px-3 pb-4">
                            <div className="row g-3">
                                <div className="col-6">
                                    <label htmlFor="login" className="form-label">Логін</label>
                                    <input type="text" className="form-control" id="login" aria-label="Логін"
                                           defaultValue={this.state.User_login} required/>
                                    <div className="invalid-feedback">
                                        Будь ласка, введіть логін.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <button className="btn btn-dark" type="submit">Зберегти</button>
                            <button className="btn btn-outline-dark mx-3" type="button"
                                    onClick={() => this.setState({isLoginEditing: false})}>Скасувати
                            </button>
                        </div>
                    </form>
                </div>
                : <div className="p-2">
                    <div className="px-3 pb-2">
                        <div className="row g-3">
                            <div className="col">
                                <h6>Логін</h6>
                                <p>{this.state.User_login}</p>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <button className="btn btn-dark"
                                onClick={() => this.setState({isLoginEditing: true})}>Редагувати
                        </button>
                    </div>
                </div>}
            <div className="h5 p-2 m-0">Зміна паролю</div>
            <div className="p-2">
                <div><p className="text-danger d-none" id="pass_change-result-text">ейейей</p></div>
                <form onSubmit={this.changePassword} noValidate>
                    <div className="px-3 pb-4">
                        <div className="row g-3">
                            <div className="col-6">
                                <label htmlFor="old-pass" className="form-label">Старий пароль</label>
                                <input type="password" className="form-control" id="old-pass" aria-label="Старий пароль"
                                       required/>
                                <div className="invalid-feedback">
                                    Поле не повинно бути пустим.
                                </div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col-6">
                                <label htmlFor="new-pass" className="form-label">Новий пароль</label>
                                <input type="password" className="form-control" id="new-pass"
                                       onChange={this.validatePasswords} aria-label="Новий пароль" required/>
                                <div className="invalid-feedback">
                                    Поле не повинно бути пустим.
                                </div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col-6">
                                <label htmlFor="new-pass-repeat" className="form-label">Повторіть новий пароль</label>
                                <input type="password" className="form-control" id="new-pass-repeat"
                                       onChange={this.validatePasswords} aria-label="Повторіть новий пароль" required/>
                                <div className="invalid-feedback" id="pass-repeat-feedback">
                                    Поле не повинно бути пустим.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <button className="btn btn-dark" type="submit">Змінити пароль</button>
                    </div>
                </form>
            </div>
        </div>
    }

    changePersonalInformation(event) {
        event.preventDefault();
        event.target.className += " was-validated";

        if (!event.target.checkValidity()) {
            return;
        }

        let first_name = document.getElementById("first_name").value;
        let last_name = document.getElementById("last_name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        fetch(
            "http://localhost/php/changepersonaldata.php", {
                method: "POST",
                body: JSON.stringify({option: "personal_data", first_name, last_name, phone, email})
            }
        ).then(response => response.text()
        ).then(responseText => {
            if (responseText === "success") {
                this.showPersonalInformationResult("Дані успішно змінено", true);
                this.setState({FirstName: first_name, LastName: last_name, Phone: phone, Email: email});
            } else {
                this.showLoginResult("Виникла помилка", false);
            }
        })
    }

    changeLogin(event) {
        event.preventDefault();
        event.target.className += " was-validated";

        if (!event.target.checkValidity()) {
            return;
        }

        let login = document.getElementById("login").value;
        fetch(
            "http://localhost/php/changepersonaldata.php", {
                method: "POST",
                body: JSON.stringify({option: "login", new_login: login})
            }
        ).then(response => response.text()
        ).then(responseText => {
            if (responseText === "success") {
                this.showLoginResult("Логін успішно змінено", true);
                this.setState({User_login: login});
            } else if (responseText === "duplicate login") {
                this.showLoginResult("Бажаний логін вже зайнятий", false);
            } else {
                this.showLoginResult("Виникла помилка", false);
            }
        })
    }

    changePassword(event) {
        event.preventDefault();
        event.target.className += " was-validated";

        if (!event.target.checkValidity() || !this.validatePasswords()) {
            return;
        }

        let old_pass = document.getElementById("old-pass").value;
        let new_pass = document.getElementById("new-pass").value;
        fetch(
            "http://localhost/php/changepersonaldata.php", {
                method: "POST",
                body: JSON.stringify({option: "password", old_password: old_pass, new_password: new_pass})
            }
        ).then(response => response.text()
        ).then(responseText => {
            if (responseText === "success") {
                this.showPassResult("Пароль успішно змінено", true);
            } else if (responseText === "invalid password") {
                this.showPassResult("Введено неправильний старий пароль", false);
            } else {
                this.showPassResult("Виникла помилка", false);
            }
        })
    }

    validatePasswords(): boolean {
        this.hidePassResult();
        let new_pass = document.getElementById("new-pass");
        let new_pass_repeat = document.getElementById("new-pass-repeat");
        if (new_pass.value !== new_pass_repeat.value) {
            new_pass_repeat.setCustomValidity("Invalid field.");
            document.getElementById("pass-repeat-feedback").textContent = "Паролі мають співпадати";
            return false;
        } else {
            new_pass_repeat.setCustomValidity("");
        }
        return true;
    }

    showPersonalInformationResult(text, success) {
        let el = document.getElementById("personal_data-result-text");
        this.showResult(text, success, el);
    }

    showLoginResult(text, success) {
        let el = document.getElementById("login_change-result-text");
        this.showResult(text, success, el);
    }

    showPassResult(text, success) {
        let el = document.getElementById("pass_change-result-text");
        this.showResult(text, success, el);
    }

    showResult(text, success, el) {
        el.textContent = text;
        el.classList.remove("d-none");
        if (success) {
            el.classList.remove("text-danger");
            el.classList.add("text-success");
        } else {
            el.classList.add("text-danger");
            el.classList.remove("text-success");
        }
    }

    hidePassResult() {
        document.getElementById("pass_change-result-text").classList.add("d-none");
    }

}

export default PersonalInformation;