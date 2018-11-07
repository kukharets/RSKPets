import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import marker from '../assets/marker.png'
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Marker extends Component {
    render(){
        const { lat, lng, map, maps } = this.props;
        console.warn("MARKER RENDER: ", lat, lng, map, maps)
        let marker = new maps.Marker({
            position: { lat: lat, lng: lng },
            map,
            title: 'Hello World!'
        });
        return null;
    }
}

class Polyline extends Component {
    render() {
        const { map, markers } = this.props;
        console.log("----polyline render", map, markers)
        const google = window.google;
        var flightPath = new google.maps.Polyline({
            path: markers,
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
            lat: 49.82973843444284,
            lng: 23.9697290377037
        },
        zoom: 16
    };

    constructor(props) {
        super(props);
        this.state = {
            mapLoaded: false,
            markers: [],
            polylines: [],
            clickTrackEnabled: false,
            distance: 0,
        };
    }

    recordClickInfo(e) {
        const state = this.state;
        const { markers } = state;
        const newMarkers = markers.concat(e)
        this.setState({
            ...state,
            markers: markers.concat(e)
        })
        if (newMarkers.length > 1) {
            this.calculateDistance(newMarkers);
            this.createPolylines();
        }
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
        // console.log("render markers", options, options1)
        // let google = window.google;
        // let marker = new options1.Marker({
        //     position: { lat: 36.05298765935, lng: -112.083756616339 },
        //     map: options,
        //     title: 'Hello World!'
        // });
    }

    createPolylines = () => {
        const { markers } = this.state;
        let polylines = [];
        console.log("CICLE")

        const count = markers.length;
        if (count > 1) {
            // for (let i = 0; i < count; i ++){
            //     console.log("CICLE")
            //     if (markers[i+1]){
            //         polylines.push({
            //             start: markers[i],
            //             end: markers[i+1]
            //         })
            //
            //     }
            // }
            this.setState({
                polylines: polylines
            })
        }
    }

    updateDistanceSuccess = (newDistance) => {
        console.log("uDS", newDistance)
        this.setState({
            distance: newDistance,
        })
    }
    googleApiLoaded = (opt) => {
        this.setState({ map: opt.map, maps: opt.maps, mapLoaded: true });
        const { markers } = this.state;
        console.log("fAL", opt.map)
        this.renderMarkers(opt.map, opt.maps)
    }

    calculateDistance = (markers) => {
        const { map, maps, distance = 0 } = this.state;
        let self = this;
        const lastIndex =  markers.length - 1;
        if (markers.length > 1) {
                var service = new maps.DistanceMatrixService();
                service.getDistanceMatrix(
                    {
                        origins: [markers[lastIndex]],
                        destinations: [markers[lastIndex-1]],
                        travelMode: 'WALKING',
                        avoidHighways: false,
                        avoidTolls: false,
                    }, callback);

                function callback(response, status) {
                    console.warn("!!!!!", response, status, distance)
                    const newDistance = distance + response.rows[0].elements[0].distance.value;
                    self.props.updateDistanceSuccess(response.rows[0].elements[0].distance.value)
                }
        }

        console.log("DIIIIISTANCE", markers)
    }


    render() {
        const { withControls } = this.props;
        const { clickTrackEnabled, markers, polylines } = this.state;
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

                {markers.length > 0 && markers.map((marker) => {
                    return <Marker lat={marker.lat} lng={marker.lng} map={this.state.map} maps={this.state.maps}/>
                })}
                {(this.state.mapLoaded && markers.length > 1) &&
                     <Polyline
                        map={this.state.map}
                        maps={this.state.maps}
                        markers={this.state.markers}
                    />
                }
            </div>
        );
    }
}

export default SimpleMap;
