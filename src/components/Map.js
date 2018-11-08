import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import {connect} from "react-redux";
import { addDistance, addMarker, selectTravel, addMapRef } from "../actions";

class Marker extends Component {
    render(){
        const { lat, lng, map, maps } = this.props;
        let marker = new maps.Marker({
            position: { lat: lat, lng: lng },
            map,
            title: 'Travel marker'
        });
        if (!map.markers) {
            map.markers = []
        }
        this.props.addMapRef(marker);
        return null;
    }
}

class Polyline extends Component {
    render() {
        const { map, markers } = this.props;
        const google = window.google;
        let flightPath = new google.maps.Polyline({
            path: markers,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);
        this.props.addMapRef(flightPath)
        return null;
    }
}


class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 49.82973843444284,
            lng: 23.9697290377037
        },
        zoom: 15
    };

    constructor(props) {
        super(props);
        this.state = {
            mapLoaded: false,
            polylines: [],
            clickTrackEnabled: false,
            distance: 0,
        };
    }

    recordClickInfo(e) {
        const { markers } = this.props;
        const newMarkers = markers.concat(e);
        this.props.addMarker(e)
        if (newMarkers.length > 1) {
            this.calculateDistance(newMarkers);
            this.createPolylines();
        }
    }

    onMapClick = e => {
        const { clickTrackEnabled } = this.state;
        if (clickTrackEnabled) {
            this.recordClickInfo(e);
        }
    };

    clickOnMapTrackerSwitch = () => {
        const { clickTrackEnabled } = this.state;
        this.setState({
            clickTrackEnabled: !clickTrackEnabled,
        })
    }

    createPolylines = () => {
        const { markers } = this.props;
        let polylines = [];

        const count = markers.length;
        if (count > 1) {
            this.setState({
                polylines: polylines
            })
        }
    }
    googleApiLoaded = (opt) => {
        this.setState({ map: opt.map, maps: opt.maps, mapLoaded: true });
    }

    calculateDistance = (markers) => {
        const { maps, distance = 0 } = this.state;
        let self = this;
        const lastIndex =  markers.length - 1;
        if (markers.length > 1) {
            let service = new maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [markers[lastIndex]],
                    destinations: [markers[lastIndex-1]],
                    travelMode: 'WALKING',
                    avoidHighways: false,
                    avoidTolls: false,
                }, callback);

            function callback(response, status) {
                self.props.addDistance(response.rows[0].elements[0].distance.value)
            }
        }

    }


    render() {
        const { withControls, markers } = this.props;
        const { clickTrackEnabled, mapLoaded } = this.state;
        return (
            <div className="text-center" style={{ height: "50vh", width: "100%", paddingTop: '10px' }}>
                {withControls &&
                <div className="position-absolute" style={{ height: "100vh", width: "100%", display: 'flex', justifyContent: 'center', paddingTop:'10vh' }}>
                    <button onClick={this.clickOnMapTrackerSwitch} className="btn bg-white position-absolute text-dark" style={{zIndex: '2000'}} type="button" >
                        {clickTrackEnabled ?
                            <span>CLICK ON MAP</span> :
                            <span>ADD MARKER</span>
                        }
                    </button>
                </div>
                }
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCJT9zjJ9OOp0cZ099HTUAMghbCUcjpW3s" }}
                    center={this.props.center}
                    defaultZoom={this.props.zoom}
                    onClick={this.onMapClick}
                    onGoogleApiLoaded={({ map, maps }) => {
                        this.googleApiLoaded({ map: map, maps: maps, mapLoaded: true });
                    }}
                    yesIWantToUseGoogleMapApiInternals
                >
                </GoogleMapReact>

                {(mapLoaded && markers.length > 0) && markers.map((marker, index) => {
                    return <Marker lat={marker.lat} lng={marker.lng} map={this.state.map} maps={this.state.maps} addMapRef={this.props.addMapRef}/>
                })}
                {(mapLoaded && markers.length > 1) &&
                <Polyline
                    map={this.state.map}
                    maps={this.state.maps}
                    markers={this.props.markers}
                    addMapRef={this.props.addMapRef}
                />
                }
            </div>
        );
    }
}

const mapStateToProps = ({ basic }) => {
    const {
        markers, selectedTravel,
    } = basic;
    return {
        markers, selectedTravel,
    };
};

export default connect(mapStateToProps, {
    addDistance,
    addMarker,
    selectTravel,
    addMapRef,
})(SimpleMap);
