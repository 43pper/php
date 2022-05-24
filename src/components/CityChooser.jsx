import React from "react";
import "../styles/style.css";

class CityChooser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {city: "", cityRef: "", isCityValid :false, cities: null};
        this.getCities = this.getCities.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.hideCitySuggest = this.hideCitySuggest.bind(this);
        this.showCitySuggest = this.showCitySuggest.bind(this);
        this.setCity = this.setCity.bind(this);
        this.onCitiesKeyDown = this.onCitiesKeyDown.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState !== this.state){
            this.props.updateParentStateCallback(this.state.city, this.state.cityRef, this.state.isCityValid);
        }
        if(prevState.city !== this.state.city){
            this.handleCityRequest();
        }
    }

    render(){
        let cities = [];
        if(this.state.cities !== null) {
            cities = this.state.cities;
        }
        return <div className="position-relative" onBlur={this.hideCitySuggest}>
            <label htmlFor="city" className="form-label">Населений пункт доставки</label>
            <input className="form-control" id="city" onChange={this.onCityChange} onKeyDown={this.onCitiesKeyDown} onFocus={this.getCities} required/>
            <ul className="tips-list d-none" id="city-suggest" tabIndex="0">
                {cities.map(item => <li key={item.Ref} className="tips-list__item" data-value={item.Ref} onClick={this.setCity}>{item.Present}</li>)}
            </ul>
            <div className="invalid-feedback" id="city-feedback">
                Будь ласка, оберіть місто доставки.
            </div>
        </div>;
    }

    onCitiesKeyDown(event){
        if(event.key === 'Enter'){
            this.getCities();
        }
    }

    onCityChange(event){
        this.setState({city: event.target.value, isCityValid: false});
    }

    handleCityRequest = () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.getCities();
        }, 350);
    }

    getCities(){
        if(this.state.city.length < 3 || this.state.isCityValid === true){
            this.setState({cities: []});
            this.hideCitySuggest();
            return;
        }
        fetch(
            "https://api.novaposhta.ua/v2.0/json/",{
                method: "POST",
                body: JSON.stringify({
                    apiKey: "38ae6f0e1431cf81d4519ef08c9c2110",
                    modelName: "Address",
                    calledMethod: "searchSettlements",
                    methodProperties: {
                        CityName: this.state.city,
                        Limit: "50",
                        Page : "1"
                    }
                })
            }
        ).then(response => response.text()).then(
            responseText => {
                let cities = JSON.parse(responseText);
                if (cities.data.length === 0){
                    this.setState({cities: []});
                    return;
                }
                this.setState({cities: cities.data[0].Addresses});
                this.showCitySuggest();
            }
        );
    }
    setCity(event){
        this.setState({city: event.target.textContent, cityRef: event.target.getAttribute('data-value'), isCityValid: true});
        document.getElementById("city").value = event.target.textContent;
        document.getElementById("city").setCustomValidity("");
        this.hideCitySuggest();
    }
    hideCitySuggest(event){
        if(event !== undefined && event.relatedTarget !== null && event.relatedTarget.tagName === "UL"){
            return;
        }
        document.getElementById("city-suggest").classList.add("d-none");
        document.getElementById("city-suggest").classList.remove("d-block");
    }
    showCitySuggest(){
        document.getElementById("city-suggest").classList.remove("d-none");
        document.getElementById("city-suggest").classList.add("d-block");
    }
}
export default CityChooser;