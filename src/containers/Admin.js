import React, {Component} from "react";
import Sha1 from "../helpers/sha1";
import firebase from 'firebase/app';
import 'firebase/auth';
import _ from 'lodash';

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

        this.state = {
            isVerified: false,
            errors: "",
            user: {
                email: '',
                password: '',
                remember: false
            },
            selectedItem: "Emission",
        };

        this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeCurrentItem = this.changeCurrentItem.bind(this);
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {this.setState({isVerified: !!user, errors: ""})}
        );
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    onPasswordSubmit(event) {
        event.preventDefault();
        let user = this.state.user;
        let that = this;

        firebase.auth().setPersistence(
            this.state.user.remember ?
                firebase.auth.Auth.Persistence.LOCAL :
                firebase.auth.Auth.Persistence.NONE
        ).then(function () {
            return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
        }).catch(function (error) {
            console.error('Login error: ', error);
            that.setState({errors: error.message});
        });
    }

    handleChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let curValue = this.state.user;
        curValue[target.name] = value;
        this.setState({user: curValue});
    }

    changeCurrentItem(item) {
        this.setState({selectedItem: item});
    }

    render() {
        let CurrentItem = Components[this.state.selectedItem + "AdminComponent"];
        let curUser = this.state.user;
        return (
            <div className="Admin">
                {this.state.isVerified ? (
                    <div className="Admin__container">
                        <nav className="Admin__navbar pure-menu pure-menu-horizontal">
                            <ul className="pure-menu-list">
                                <li
                                    className="pure-menu-item"
                                    onClick={() => this.changeCurrentItem("Category")}>
                                    <span className="pure-menu-link">Catégories d'émissions</span>
                                </li>
                                <li
                                    className="pure-menu-item"
                                    onClick={() => this.changeCurrentItem("Emission")}>
                                    <span className="pure-menu-link">Emissions</span>
                                </li>
                                <li
                                    className="pure-menu-item"
                                    onClick={() => this.changeCurrentItem("Question")}>
                                    <span className="pure-menu-link">Questions</span>
                                </li>
                                <li
                                    className="pure-menu-item"
                                    onClick={() => firebase.auth().signOut()}>
                                    <button className="pure-button pure-button-primary"> Log out</button>
                                </li>
                            </ul>
                        </nav>

                        <div className="Admin__current">
                            <CurrentItem />
                        </div>
                    </div>
                ) : (
                    <div className={'Admin__loginForm'}>
                        <form
                            className={'pure-form'}
                            onSubmit={this.onPasswordSubmit}
                        >
                            {
                                _.isEmpty(this.state.errors) ?
                                    "" :
                                    <legend className={'pure-form--error'}>{this.state.errors}</legend>
                            }
                            <fieldset>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={curUser.email}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={curUser.password}
                                />
                                <label htmlFor="remember" className="pure-checkbox">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        name="remember"
                                        checked={curUser.remember}
                                        onChange={this.handleChange}
                                    /> Remember me
                                </label>
                                <button type="submit" className="pure-button pure-button-primary">Sign in</button>
                            </fieldset>
                        </form>
                    </div>
                )}
            </div>

        );
    }
}
