import React from "react";
import "../styles/style.css";

class WarehouseChooser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {active: props.active, cityRef: "", warehouse: "", warehouseRef: "", isWarehouseValid :false, warehouses: null};
        this.getWarehouses = this.getWarehouses.bind(this);
        this.onWarehouseChange = this.onWarehouseChange.bind(this);
        this.hideWarehouseSuggest = this.hideWarehouseSuggest.bind(this);
        this.showWarehouseSuggest = this.showWarehouseSuggest.bind(this);
        this.setWarehouse = this.setWarehouse.bind(this);
        this.onWarehouseKeyDown = this.onWarehouseKeyDown.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props){
            this.setState({active: this.props.active, cityRef: this.props.cityRef});
            if(!this.props.active){
                this.setState({warehouse: "", warehouseRef: "", isWarehouseValid: false, warehouses: []});
                document.getElementById("warehouse").value = "";
            }
        }
        else if(prevState.warehouse !== this.state.warehouse || prevState.warehouseRef !== this.state.warehouseRef || prevState.isWarehouseValid !== this.state.isWarehouseValid){
            this.props.updateParentStateCallback(this.state.warehouse, this.state.warehouseRef, this.state.isWarehouseValid);
        }
        if(prevState.warehouse !== this.state.warehouse){
            this.handleWarehouseRequest();
        }

    }

    render(){
        let warehouses = [];
        if(this.state.warehouses !== null) {
            warehouses = this.state.warehouses;
        }
        return <div className="position-relative" onBlur={this.hideWarehouseSuggest}>
            <label htmlFor="warehouse" className="form-label">Відділення Нової Пошти</label>
            <input className="form-control" id="warehouse" disabled={!this.state.active} onChange={this.onWarehouseChange} onKeyDown={this.onWarehouseKeyDown} onFocus={this.getWarehouses} required/>
            <ul className="tips-list d-none" id="warehouse-suggest" tabIndex="0">
                {warehouses.map(item => <li key={item.Ref} className="tips-list__item" data-value={item.Ref} onClick={this.setWarehouse}>{item.Description}</li>)}
            </ul>
            <div className="invalid-feedback" id="warehouse-feedback">
                Будь ласка, оберіть відділення доставки.
            </div>
        </div>;
    }

    onWarehouseKeyDown(event){
        if(event.key === 'Enter'){
            this.getWarehouses();
        }
    }

    onWarehouseChange(event){
        this.setState({warehouse: event.target.value, isWarehouseValid: false});
    }

    handleWarehouseRequest = () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.getWarehouses();
        }, 350);
    }

    getWarehouses(){
        if(!this.state.active || this.state.isWarehouseValid === true){
            this.setState({cities: []});
            this.hideWarehouseSuggest();
            return;
        }
        let properties;
        if(this.state.warehouse === ""){
            properties = {
                SettlementRef: this.state.cityRef,
                Limit: "50",
                Page : "1"
            };
        }
        else{
            properties = {
                SettlementRef: this.state.cityRef,
                FindByString: this.state.warehouse,
                Limit: "50",
                Page : "1"
            };
        }

        fetch(
            "https://api.novaposhta.ua/v2.0/json/",{
                method: "POST",
                body: JSON.stringify({
                    apiKey: "38ae6f0e1431cf81d4519ef08c9c2110",
                    modelName: "Address",
                    calledMethod: "getWarehouses",
                    methodProperties: properties
                })
            }
        ).then(response => response.text()).then(
            responseText => {
                let warehouses = JSON.parse(responseText);
                if (warehouses.data.length === 0){
                    this.setState({warehouses: []});
                    return;
                }
                this.setState({warehouses: warehouses.data});
                this.showWarehouseSuggest();
            }
        );
    }
    setWarehouse(event){
        this.setState({warehouse: event.target.textContent, warehouseRef: event.target.getAttribute('data-value'), isWarehouseValid: true});
        document.getElementById("warehouse").value = event.target.textContent;
        document.getElementById("warehouse").setCustomValidity("");
        this.hideWarehouseSuggest();
    }
    hideWarehouseSuggest(event){
        if(event !== undefined && event.relatedTarget !== null && event.relatedTarget.tagName === "UL"){
            return;
        }
        document.getElementById("warehouse-suggest").classList.add("d-none");
        document.getElementById("warehouse-suggest").classList.remove("d-block");
    }
    showWarehouseSuggest(){
        document.getElementById("warehouse-suggest").classList.remove("d-none");
        document.getElementById("warehouse-suggest").classList.add("d-block");
    }
}
export default WarehouseChooser;