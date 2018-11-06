import React, { Component } from 'react';
import SimpleMap from "./Map";

class App extends Component {
    render() {
        return (
                <div className="p-5 h-100">
                    <div className="row h-100 w-100">
                        <div className="col-sm border-right p-3">
                            One of three columns
                        </div>
                        <div className="col-sm p-3">
                            <SimpleMap/>
                        </div>
                    </div>
                </div>
        );
    }
}

export default App;