import React, { Component } from 'react';
import SimpleMap from "./Map";
import { fetchTravels, selectTravel, deleteTravel, addToFavorite } from "../actions";
import {connect} from "react-redux";
import arrows from "../assets/arrows.png"
import right from '../assets/right.png';
import star from '../assets/star.png';

class Travel extends Component {
    constructor(){
        super()
    }
    selectTravel = () => {
        const { data, index } = this.props;
        console.log(data, index)
        data.index = index;
        this.props.selectTravel(data)
    }
    render(){

        console.log("TRAVEL RENDER", this.props)
        const { data, selectedTravel, index } = this.props;
        const { title, short, distance, favorite } = data;
        const attachClass = (selectedTravel && (selectedTravel.index == index)) ? 'row m-4 lol hoverable ' : 'row m-4 bg-light hoverable';
        return (
            <div onClick={this.selectTravel} style={{marginTop: '0', height: '100px'}} className={attachClass}>
                <div className="col-2 no-pad border">
                    <img style={{width: '100%', paddingTop: '15px'}} src={arrows} alt=""/>
                </div>
                <div className="col-6 border" >
                    <h4>{favorite && <img style={{ height: '16px', width: '16px' }} src={star} alt=""/>}{title}</h4>
                    <div style={{
                        height: '60px',
                        overflow: 'hidden',}}>{short}</div>
                </div>
                <div className="col-4" style={{ marginTop: '35px' }}>
                        <h4>
                            {distance > 0 ? (distance/1000).toFixed(2) : 0}&nbsp;km
                            <img className="float-right" style={{ height: '20px', width: '20px' }} src={right} alt=""/>
                        </h4>
                </div>
            </div>
        )
    }
}

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
    deleteTravel = () => {
        const { selectedTravel, deleteTravel } = this.props;
        deleteTravel(selectedTravel.key);
    }
    addToFavorite = () => {
        const { selectedTravel, addToFavorite } = this.props;
        addToFavorite(selectedTravel.key);
    }
    render() {
        console.log("travels", this.props.travels)
        const { travels, selectedTravel, selectTravel } = this.props;
        return (
                <div className="p-5 h-100">
                    <div className="row h-100 w-100">
                        <div className="col-sm border-right p-3">
                            <form className="card card-sm">
                                <div style={{marginBottom: '0'}} className="card-body row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <i className="fas fa-search h4 text-body"></i>
                                    </div>
                                    <div className="col">
                                        <input className="form-control form-control-lg"
                                               type="search" placeholder="Search treavel"/>
                                    </div>
                                </div>
                                <div className="p-1">
                                    {travels.length > 0 && travels.map((travel, index) => {
                                        return <Travel data={travel} index={index} selectedTravel={selectedTravel} selectTravel={selectTravel}/>
                                    })}
                                </div>

                            </form>
                        </div>
                        <div className="col-sm p-3">
                            {this.props.selectedTravel ?
                                <div className="p-4">
                                    <span>{selectedTravel.title}</span><span className="float-right h4">{selectedTravel.distance > 0 ? (selectedTravel.distance/1000).toFixed(2) : 0}&nbsp;km</span>
                                    <div>{selectedTravel.description}</div>
                                    <SimpleMap />
                                    <div onClick={this.addToFavorite} style={{ cursor: 'pointer' }} className="float-right hover">Add to favorites</div>
                                    <br/>
                                    <div onClick={this.deleteTravel} style={{ color: 'red', cursor: 'pointer' }} className="float-right hover">Delete</div>
                                </div> :
                                <h3 class="text-center">
                                    Choice travel for show
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
        travels, selectedTravel,
    } = basic;
    return {
        travels, selectedTravel,
    };
};

export default connect(mapStateToProps, {
    fetchTravels,
    selectTravel,
    deleteTravel,
    addToFavorite,
})(App);