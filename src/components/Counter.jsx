import React from 'react';

class Counter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {count: parseInt(props.count)};
        this.handChange = this.handChange.bind(this);
    }
    render() {
        return <div>
            <div className="_icon-minus _black-icon d-inline-block counter-block" onClick={() => this.change("down")}></div>
            <div className="d-inline-block counter-block"><input type="number" className="number-input text-center" value={this.state.count} onChange={this.handChange} min={1}/></div>
            <div className="_icon-plus _black-icon d-inline-block counter-block" onClick={() => this.change("up")}></div>
        </div>
    }
    change(change_var){
        if(change_var === "up"){
            this.setState({count: this.state.count + 1});
        }
        else{
            if(this.state.count > 1)
            {
                this.setState({count: this.state.count - 1});
            }
        }
    }
    handChange(event){
        let num = parseInt(event.target.value);
        if(isNaN(num) || num < 1){
            num = 1;
        }
        this.setState({count: num});
    }
}
export default Counter;