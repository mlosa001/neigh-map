import React, { Component } from 'react';
import Map from "./Map";
import ListView from "./ListView";

class ContentView extends Component {
    render() {
        return (
            <div className='contents'>
            <ListView/>
            <Map/>
            </div>

        )
    }
}

export default ContentView ;