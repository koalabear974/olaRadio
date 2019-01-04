import React, {Component} from "react";
import Sha1 from "../helpers/sha1";
import firebase from 'firebase/app';
import 'firebase/auth';
import _ from 'lodash';

import CategoryAdminComponent from "../components/admin/CategoryAdminComponent";
import EmissionAdminComponent from "../components/admin/EmissionAdminComponent";
import QuestionAdminComponent from "../components/admin/QuestionAdminComponent";
import StaticAdminComponent from "../components/admin/StaticAdminComponent";

import 'bulma/css/bulma.css'
import "./../styles/Admin.css";
import LoginForm from "../components/admin/common/forms/LoginForm";
import AdminNavbar from "../components/admin/common/forms/AdminNav";

const Components = {
    CategoryAdminComponent: CategoryAdminComponent,
    EmissionAdminComponent: EmissionAdminComponent,
    QuestionAdminComponent: QuestionAdminComponent,
    StaticAdminComponent: StaticAdminComponent,
};

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVerified: false,
            loginErrors: '',
            selectedItem: "Emission",
        };

        this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
        this.changeCurrentItem = this.changeCurrentItem.bind(this);
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {
                this.setState({isVerified: !!user, errors: ""})
            }
        );
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    onPasswordSubmit(user) {
        let that = this;

        firebase.auth().setPersistence(
            user.remember ?
                firebase.auth.Auth.Persistence.LOCAL :
                firebase.auth.Auth.Persistence.NONE
        ).then(() => {
            // TODO fix this double code
            that.setState({loginErrors: ''});
            that.setState({loginErrors: ''});
            return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
        }).catch((error) => {
            console.error('Login error: ', error);
            that.setState({loginErrors: error.message});
            that.setState({loginErrors: error.message});
        });
    }

    changeCurrentItem(item) {
        this.setState({selectedItem: item});
    }

    render() {
        let CurrentItem = Components[this.state.selectedItem + "AdminComponent"];

        if (!this.state.isVerified) {
            return (
                <div className="Admin">
                    <div className={'Admin__loginForm'}>
                        <LoginForm
                            onSubmit={this.onPasswordSubmit}
                            errors={this.state.loginErrors}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="Admin">
                <div className="Admin__container">
                    <AdminNavbar
                        onNavClick={this.changeCurrentItem}
                        selected={this.state.selectedItem}
                    />
                    <div className="Admin__current">
                        <CurrentItem/>
                    </div>
                </div>
            </div>
        );

    }
}
