import React, {Component, Fragment} from "react";
import Sha1 from "../helpers/sha1";

import CategoryAdminComponent from "../components/admin/CategoryAdminComponent";
import EmissionAdminComponent from "../components/admin/EmissionAdminComponent";
import QuestionAdminComponent from "../components/admin/QuestionAdminComponent";

import "./../styles/Admin.css";

const Components = {
    CategoryAdminComponent: CategoryAdminComponent,
    EmissionAdminComponent: EmissionAdminComponent,
    QuestionAdminComponent: QuestionAdminComponent,
};

export default class Admin extends Component {
    constructor(props) {
        super(props);

        // The Website password
        this.password = 'e7ee777deaff95f2c168a88c4c82b3d6531553bc';

        this.state = {
            isVerified: true,
            passwordValue: "",
            selectedItem: "Question",
        };

        this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeCurrentItem = this.changeCurrentItem.bind(this);
    }

    componentDidMount() {
    }

    onPasswordSubmit(event) {
        event.preventDefault();
        this.setState({isVerified: (this.password ===  Sha1.hash(this.state.passwordValue))})
    }

    handleChange(event) {
        this.setState({passwordValue: event.target.value});
    }

    changeCurrentItem(item) {
        this.setState({selectedItem: item});
    }

    render() {
        let CurrentItem = Components[this.state.selectedItem + "AdminComponent"];
        return (
            <div className="Admin">
                {this.state.isVerified ? (
                    <div className="Admin__container">
                        <nav className="Admin__navbar pure-menu pure-menu-horizontal">
                            <ul className="pure-menu-list">
                                <li
                                    className="pure-menu-item"
                                    onClick={() => this.changeCurrentItem("Category")}>
                                    <a href="#" className="pure-menu-link">Catégories d'émissions</a>
                                </li>
                                <li
                                    className="pure-menu-item"
                                    onClick={() => this.changeCurrentItem("Emission")}>
                                    <a href="#" className="pure-menu-link">Emissions</a>
                                </li>
                                <li
                                    className="pure-menu-item"
                                    onClick={() => this.changeCurrentItem("Question")}>
                                    <a href="#" className="pure-menu-link">Questions</a>
                                </li>
                            </ul>
                        </nav>

                        <div className="Admin__current">
                            <CurrentItem />
                        </div>
                    </div>
                ) : (
                    <div>
                        <form onSubmit={this.onPasswordSubmit}>
                            <input
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.passwordValue}
                            />
                            <input type="submit" value="Log in" />
                        </form>
                    </div>
                )}
            </div>

        );
    }
}
