import React from "react";
import { switchDailyPreviewModalState } from "../actions";
import { connect } from "react-redux";
import AddPathModal from "../components/AddPathModal";

class Navigation extends React.Component {
  addPathClick = () => {
    this.props.switchDailyPreviewModalState();
  };
  render() {
    return (
      <nav className="navbar bg-white">
        <a className="navbar-brand text-dark" href="/">
          Travels
        </a>
        <button
          onClick={this.addPathClick.bind(this)}
          className="btn bg-primary"
          type="button"
        >
          ADD PATH
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <AddPathModal />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ basic }) => {
  const { switchDailyPreviewModalState } = basic;
  return {
    switchDailyPreviewModalState
  };
};
export default connect(
  mapStateToProps,
  {
    switchDailyPreviewModalState
  }
)(Navigation);
