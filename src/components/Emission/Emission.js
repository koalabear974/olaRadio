import React, {Component} from "react";

export default class Emission extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        let emission = this.props.emission;
        return (
            <div className="Emission">
                {emission.name}
            </div>
        );
    }
}
