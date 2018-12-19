import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {FaCheck, FaEnvelope, FaLock} from "react-icons/fa/index";

export default class LoginForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        errors: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            errors: '',
            user: {
                email: '',
                password: '',
                remember: false
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillUpdate() {
        if (this.props.errors && this.props.errors !== this.state.errors) {
            this.setState({errors: this.props.errors});
        }
    }

    handleChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let curValue = this.state.user;
        curValue[target.name] = value;
        this.setState({user: curValue});
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({errors: ''});
        this.props.onSubmit(this.state.user);
    }

    render() {
        let user = this.state.user;
        return (
            <form
                className={'pure-form'}
                onSubmit={this.onSubmit}
            >
                {
                    _.isEmpty(this.state.errors) ?
                        "" :
                        <div className="notification is-danger">{this.state.errors}</div>
                }

                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input"
                               type="email"
                               placeholder="Email"
                               name="email"
                               onChange={this.handleChange}
                               value={user.email}
                        />
                        <span className="icon is-small is-left"><FaEnvelope className={'fas'}/></span>
                        <span className="icon is-small is-right"><FaCheck className={'fas'}/></span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange}
                            value={user.password}
                        />
                        <span className="icon is-small is-left"><FaLock className={'fas'}/></span>
                    </p>
                </div>
                <label className="checkbox">
                    <input
                        id="remember"
                           type="checkbox"
                           name="remember"
                           checked={user.remember}
                           onChange={this.handleChange}
                    /> Remember me
                </label>
                <div className="field">
                    <p className="control is-pulled-right">
                        <button type="submit" className="button is-success">Login</button>
                    </p>
                </div>
            </form>

        );
    }
}
