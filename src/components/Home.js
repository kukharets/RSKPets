import React, { Component } from 'react';
import SimpleMap from "./Map";
import { fetchTravels } from "../actions";
import {connect} from "react-redux";

class App extends Component {
    constructor(){
        super();
        this.state={
            mapLoaded: false,
        }
    }
    componentWillMount() {
        this.props.fetchTravels();
    }
    render() {
        console.log("travels", this.props.travels)
        return (
                <div className="p-5 h-100">
                    <div className="row h-100 w-100">
                        <div className="col-sm border-right p-3">
                            One of three columns
                            {this.props.travels.length}
                        </div>
                        <div className="col-sm p-3">
                            {this.state.mapLoaded ?
                            <SimpleMap/> :
                                <h3 class="text-center">
                                    Choise travel for show
                                </h3>
                            }
                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = ({ basic }) => {
    console.log('mSTP FullReports.js > ', basic);
    const {
        travels,
    } = basic;
    return {
        travels,
    };
};

export default connect(mapStateToProps, {
    fetchTravels
})(App);