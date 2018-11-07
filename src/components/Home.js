import React, { Component } from 'react';
import SimpleMap from "./Map";

class App extends Component {
    constructor(){
        super();
        this.state={
            mapLoaded: false,
        }
    }
    render() {
        return (
                <div className="p-5 h-100">
                    <div className="row h-100 w-100">
                        <div className="col-sm border-right p-3">
                            One of three columns
                        </div>
                        <div className="col-sm p-3">
                            {this.state.mapLoaded ?
                            <SimpleMap/> :
                                <h3 class="text-center">
                                    Choise travel for show
                                </h3>
                            }
                        </div>
                    </div>
                </div>
        );
    }
}

export default App;