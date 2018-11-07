import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class Polyline extends Component {
    render() {
        const { map } = this.props;
        const google = window.google;
        var flightPlanCoordinates = [
            { lat: 37.772, lng: -122.214 },
            { lat: 21.291, lng: -157.821 },
            { lat: -18.142, lng: 178.431 },
            { lat: -27.467, lng: 153.027 }
        ];
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);

        return null;
    }

    renderPolyline() {
        console.log("REN");
    }
}

class Normal extends Polyline {
    renderPolyline() {
        return {
            geodesic: true,
            strokeColor: this.props.color || "#ffffff",
            strokeOpacity: 1,
            strokeWeight: 4
        };
    }
}
class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 36.2169884797185,
            lng: -112.056727493181
        },
        zoom: 11
    };

    constructor(props) {
        super(props);
        this.state = {
            mapLoaded: false
        };
    }

    onMapClick = e => {
        console.log(e);
    };

    render() {
        const pathCoordinates = [
            { lat: 36.05298765935, lng: -112.083756616339 },
            { lat: 36.2169884797185, lng: -112.056727493181 }
        ];
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCJT9zjJ9OOp0cZ099HTUAMghbCUcjpW3s" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    onClick={this.onMapClick}
                    onGoogleApiLoaded={({ map, maps }) => {
                        this.setState({ map: map, maps: maps, mapLoaded: true });
                    }}
                    yesIWantToUseGoogleMapApiInternals
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text={"Kreyser Avrora"}
                    />
                </GoogleMapReact>
                {this.state.mapLoaded && (
                    <Polyline
                        map={this.state.map}
                        maps={this.state.maps}
                        origin={{ lat: 36.05298765935, lng: -112.083756616339 }}
                        destination={{ lat: 36.2169884797185, lng: -112.056727493181 }}
                    />
                )}
            </div>
        );
    }
}

export default SimpleMap;
