import React, { Component } from 'react'
import Modal from 'react-modal';
import { switchDailyPreviewModalState } from '../actions';
import {connect} from "react-redux";
import SimpleMap from "./Map";



class AddPathModalWrapper extends Component {
        constructor(){
            super();
            this.state = {
                clickTrackEnabled: false,
            }
        }
        sendClickInfo = (e) => {
            console.log("ADM click ->", e);
        }
        render() {
            const { addPathModalOpenState, switchDailyPreviewModalState } = this.props;
        return (
            <Modal
                isOpen={addPathModalOpenState}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={switchDailyPreviewModalState}
                contentLabel="Example Modal"
                style={{ overlay: {marginTop: '20px'}, content: {} }}
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
                        One of three columns
                    </div>
                    <div className="col-sm p-3">
                        <SimpleMap sendClickInfo={this.sendClickInfo}withControls/>
                    </div>
                </div>
            </Modal>
    )}
}
const mapStateToProps = ({ basic }) => {
    console.log('mSTP FullReports.js > ', basic);
    const {
        addPathModalOpenState,
    } = basic;
    return {
        addPathModalOpenState
    };
};

export default connect(mapStateToProps, {
    switchDailyPreviewModalState,
})(AddPathModalWrapper);