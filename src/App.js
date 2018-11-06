import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';

class App extends Component {
    render() {
        return (
            <div className="h-100">
                <Navigation />
                <Home/>
            </div>
        );
    }
}

export default App;