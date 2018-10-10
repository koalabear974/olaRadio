import React, {Component} from "react";
import Emission from "./Emission";

import "../../styles/components/Emission.css"

export default class EmissionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const emissionsArray = this.props.emissions;
        return (
            <div className="EmissionList">
                {Object.keys(emissionsArray).map(function(key) {
                    return (
                        <Emission
                            key={key}
                            emission={emissionsArray[key]}
                        />
                    );
                })}
            </div>
        );
    }
}
