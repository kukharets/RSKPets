import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import marker from '../assets/marker.png'
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Marker extends Component {
    render(){
        console.log("render", this.props)
        return (
            <img style={{ height: '10px', width: '10px', zIndex: '4000'}} src={marker} />
        )
    }
}

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
            lat: 36.05298765935,
            lng: -112.056727493181
        },
        zoom: 8
    };

    constructor(props) {
        super(props);
        this.state = {
            mapLoaded: false,
            markers: [],
            clickTrackEnabled: false,
        };
    }

    recordClickInfo(e) {
        const state = this.state;
        const { markers } = state;
        this.setState({
            ...state,
            markers: markers.concat(e)
        })
    }

    onMapClick = e => {
        const { clickTrackEnabled } = this.state;
        console.log(e, clickTrackEnabled);
        if (clickTrackEnabled) {
            this.recordClickInfo(e);
        }
    };

    clickOnMapTrackerSwitch = () => {
        const { clickTrackEnabled, markers } = this.state;
        this.setState({
            clickTrackEnabled: !clickTrackEnabled,
        })
    }
    renderMarkers = (options, options1) => {
        console.log("render markers", options, options1)
        let google = window.google;
        let marker = new options1.Marker({
            position: { lat: 36.05298765935, lng: -112.083756616339 },
            map: options,
            title: 'Hello World!'
        });
    }

    googleApiLoaded = (opt) => {
        this.setState({ map: opt.map, maps: opt.maps, mapLoaded: true });
        const { markers } = this.state;
        console.log("fAL", opt.map)
        this.renderMarkers(opt.map, opt.maps)
    }

    render() {
        const pathCoordinates = [
            { lat: 36.05298765935, lng: -112.083756616339 },
            { lat: 36.2169884797185, lng: -112.056727493181 }
        ];
        const { withControls } = this.props;
        const { clickTrackEnabled, markers } = this.state;
        console.log("render map state: ", this.state);
        return (
            // Important! Always set the container height explicitly
            <div className="text-center" style={{ height: "70vh", width: "100%" }}>
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
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    onClick={this.onMapClick}
                    onGoogleApiLoaded={({ map, maps }) => {
                        this.googleApiLoaded({ map: map, maps: maps, mapLoaded: true });
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
                {/*{markers.length > 0 && markers.map((marker) => {*/}
                    {/*return <Marker lat={59.955413} lng={30.337844}/>*/}
                {/*})}*/}
            </div>
        );
    }
}

export default SimpleMap;
