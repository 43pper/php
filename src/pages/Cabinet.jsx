import React from 'react';
import "../styles/style.css";
import Header from "../components/Header";
import CabinetBody from "../components/CabinetBody";

class Cabinet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: this.props.login};
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.props !== prevProps) {
            this.setState({login: this.props.login});
        }
    }

    render() {
        return <div className="App">
            <div className="container-fluid col-md-10">
                <Header login={this.state.login}/>
                <CabinetBody changeAccountCallback={() => this.props.changeAccountCallback()}/>
            </div>
        </div>;
    }

}

export default Cabinet;