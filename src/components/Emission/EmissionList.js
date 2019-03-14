import React, {Component} from "react";
import PropTypes from "prop-types";
import Emission from "./Emission";

import "../../styles/components/Emission.css"

export default class EmissionList extends Component {
    static propTypes = {
        emissions: PropTypes.arrayOf(PropTypes.object),
        onEmissionClick: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const emissionsArray = this.props.emissions;
        let onEmissionClickFunc = this.props.onEmissionClick;
        return (
            <div className="EmissionList">
                {Object.keys(emissionsArray).map(function(key) {
                    return (
                        <Emission
                            key={key}
                            emission={emissionsArray[key]}
                            onEmissionClick={onEmissionClickFunc}
                        />
                    );
                })}
            </div>
        );
    }
}
