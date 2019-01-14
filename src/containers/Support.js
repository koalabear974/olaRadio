import React, { Component} from "react";

import "../styles/containers/Support.css"

export default class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={'Support'}>
                <a
                    target={'_blank'}
                    href={'https://www.helloasso.com/associations/ola-radio/formulaires/1/widget'}
                    className="Support__cta"
                >
                    Nous soutenir
                </a>
            </div>
        );
    }
}
