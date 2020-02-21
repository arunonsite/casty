import React, { Component } from 'react';
import { ScaleLoader } from "react-spinners";
/**
 * Renders the preloader
 */
class PreLoaderWidget extends Component {

    render() {
        return (
            <div className="preloader">
                <div className="status">
                <ScaleLoader 
          
          size={35}
          //size={"150px"} this also works
          color={"#343a40"}
          loading={true}
        />
                </div>
            </div>
        )
    }
}

export default PreLoaderWidget;