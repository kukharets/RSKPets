import React, { Component } from "react";
import SimpleMap from "./Map";
import {
  fetchTravels,
  selectTravel,
  deleteTravel,
  addToFavorite,
  filterTravels
} from "../actions";
import { connect } from "react-redux";
import arrows from "../assets/arrows.png";
import right from "../assets/right.png";
import star from "../assets/star.png";

class Travel extends Component {
  selectTravel = () => {
    const { data } = this.props;
    this.props.selectTravel(data);
  };
  render() {
    const { data, selectedTravel } = this.props;
    const { title, short, distance, favorite, key } = data;
    const attachClass =
      selectedTravel && selectedTravel.key == key
        ? "row m-4 lol hoverable "
        : "row m-4 bg-light hoverable";
    return (
      <div
        onClick={this.selectTravel}
        style={{ marginTop: "0", height: "100px" }}
        className={attachClass}
      >
        <div className="col-2 no-pad">
          <img
            style={{ width: "100%", paddingTop: "15px" }}
            src={arrows}
            alt=""
          />
        </div>
        <div className="col-6">
          <h4>
            {favorite && (
              <img
                style={{ height: "16px", width: "16px" }}
                src={star}
                alt=""
              />
            )}
            {title}
          </h4>
          <div
            style={{
              height: "60px",
              overflow: "hidden"
            }}
          >
            {short}
          </div>
        </div>
        <div className="col-4" style={{ marginTop: "35px" }}>
          <h4>
            {distance > 0 ? (distance / 1000).toFixed(2) : 0}
            &nbsp;km
            <img
              className="float-right"
              style={{ height: "20px", width: "20px" }}
              src={right}
              alt=""
            />
          </h4>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      mapLoaded: false
    };
  }
  componentWillMount() {
    this.props.fetchTravels();
  }
  deleteTravel = () => {
    const { selectedTravel, deleteTravel } = this.props;
    deleteTravel(selectedTravel.key);
  };
  addToFavorite = () => {
    const { selectedTravel, addToFavorite } = this.props;
    addToFavorite(selectedTravel.key);
  };
  filterTravels = e => {
    const value = e.target.value;
    if (value) {
      this.props.filterTravels(e.target.value);
    } else {
      this.props.fetchTravels();
    }
  };
  render() {
    const { travels, selectedTravel, selectTravel } = this.props;
    const center = selectedTravel && selectedTravel.markers && selectedTravel.markers[0];
    return (
      <div className="p-5 h-100">
        <div className="row h-100 w-100">
          <div className="col-sm border-right p-3">
            <form className="card card-sm">
              <div
                style={{ marginBottom: "0" }}
                className="card-body row no-gutters align-items-center"
              >
                <div className="col-auto">
                  <i className="fas fa-search h4 text-body" />
                </div>
                <div className="col">
                  <input
                    onChange={this.filterTravels}
                    className="form-control form-control-lg"
                    type="search"
                    placeholder="Search treavel"
                  />
                </div>
              </div>
              <div style={{ height: "70vh", overflowY: 'scroll' }}  className="p-1 scrolling">
                {travels.length > 0 &&
                  travels.map((travel, index) => {
                    return (
                      <Travel
                        data={travel}
                        index={index}
                        selectedTravel={selectedTravel}
                        selectTravel={selectTravel}
                      />
                    );
                  })}
              </div>
            </form>
          </div>
          <div className="col-sm p-3">
            {this.props.selectedTravel ? (
              <div className="p-4">
                <span>{selectedTravel.title}</span>
                <span className="float-right h4">
                  {selectedTravel.distance > 0
                    ? (selectedTravel.distance / 1000).toFixed(2)
                    : 0}
                  &nbsp;km
                </span>
                <div>{selectedTravel.description}</div>
                <SimpleMap center={center}/>
                <div
                  onClick={this.addToFavorite}
                  style={{ cursor: "pointer" }}
                  className="float-right hover"
                >
                  Add to favorites
                </div>
                <br />
                <div
                  onClick={this.deleteTravel}
                  style={{ color: "red", cursor: "pointer" }}
                  className="float-right hover"
                >
                  Delete
                </div>
              </div>
            ) : (
              <h3 class="text-center">Choice travel for show</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ basic }) => {
  const { travels, selectedTravel } = basic;
  return {
    travels,
    selectedTravel
  };
};

export default connect(
  mapStateToProps,
  {
    fetchTravels,
    selectTravel,
    deleteTravel,
    addToFavorite,
    filterTravels
  }
)(App);
