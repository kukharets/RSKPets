import React, { Component } from 'react'
import Modal from 'react-modal';
import { switchDailyPreviewModalState, addTravel } from '../actions';
import {connect} from "react-redux";
import SimpleMap from "./Map";



class AddPathModalWrapper extends Component {
        constructor(){
            super();
            this.state = {
                clickTrackEnabled: false,
                title: '',
                short: '',
                description: '',
            }
        }
        sendClickInfo = (e) => {
            console.log("ADM click ->", e);
        }
        // updateDistanceSuccess = (newPattern) => {
        //     const { distance } = this.state;
        //     const newDistance = distance + newPattern;
        //     this.setState({
        //         distance: newDistance
        //     })
        // }
        handleChange = name => (event) => {
            this.setState({
                [name]: event.target.value,
            });
        };
    handleSave = () => {
        const { markers, distance } = this.props;
        const { title, short, description } = this.state;
        console.warn(" TOTAL ::: :: ", markers, distance, title, short, description )
        let markersJSON = {};
        if (markers.length > 1){
            for (let i = 0; i < markers.length; i++){
                markersJSON[i] = { lat: markers[i].lat, lng: markers[i].lng }
            }
        }
        const newTravel = {
            markers: markersJSON, distance, title, short, description,
        }
        this.props.addTravel(newTravel);
    };
        render() {
            const { addPathModalOpenState, switchDailyPreviewModalState, distance } = this.props;
        return (
            <Modal
                isOpen={addPathModalOpenState}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={switchDailyPreviewModalState}
                contentLabel="Example Modal"
                style={{ overlay: {}, content: {} }}
            >
                <nav className="row navbar bg-white ">
                    <div className="w-100">
                        <h3 className="text-dark float-left">Add new path</h3>
                        <button onClick={switchDailyPreviewModalState} className="btn float-right bg-primary " type="button" >
                            X
                        </button>
                    </div>
                </nav>
                <div className="row h-100 w-100">
                    <div className="col-sm border-right p-3">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Title</label>
                                <input onChange={this.handleChange('title')} value={this.state.title} type="title" className="form-control" id="exampleFormControlInput1"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Short description</label>
                                <textarea onChange={this.handleChange('short')} value={this.state.short} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Full description</label>
                                <textarea onChange={this.handleChange('description')} value={this.state.description} className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                            </div>
                        </form>
                        <div className="text-center"><h3>{distance ? (distance/1000).toFixed(2) : 0} KM</h3></div>
                        <div style={{  display: 'flex', justifyContent: 'center' }}>
                            <button onClick={this.handleSave} className="btn bg-white text-dark" style={{zIndex: '2000'}} type="button" >
                                ✔ Add path
                            </button>
                        </div>
                    </div>
                    <div className="col-sm p-3">
                        <SimpleMap withControls/>
                    </div>
                </div>
            </Modal>
    )}
}
const mapStateToProps = ({ basic }) => {
    console.log('mSTP FullReports.js > ', basic);
    const {
        addPathModalOpenState, distance, markers
    } = basic;
    return {
        addPathModalOpenState, distance, markers
    };
};

export default connect(mapStateToProps, {
    switchDailyPreviewModalState,
    addTravel,
})(AddPathModalWrapper);