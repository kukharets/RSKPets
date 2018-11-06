import React, { Component } from 'react'
import Modal from 'react-modal';
import { switchDailyPreviewModalState } from '../actions';
import {connect} from "react-redux";



class AddPathModalWrapper extends Component {
        render() {
            const { addPathModalOpenState, switchDailyPreviewModalState } = this.props;
        return (
            <Modal
                isOpen={addPathModalOpenState}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={switchDailyPreviewModalState}
                contentLabel="Example Modal"
            >

                <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                <button onClick={switchDailyPreviewModalState}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
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