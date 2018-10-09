import React, {Component, Fragment} from "react";
import base from "../db/config";


export default class CategoryAdminComponent extends Component {
    constructor(props) {
        super(props);


        this.state = {
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
    }

    handleChange(event) {
        this.setState({passwordValue: event.target.value});
    }

    render() {
        return (
            <div>
                CategoryAdminComponent
            </div>

        );
    }
}
