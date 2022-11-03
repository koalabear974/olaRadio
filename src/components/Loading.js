import React, {Component} from "react";

import "./../styles/components/Logo.css";

export default class Loading extends Component {
    static propTypes = {
    };

    render() {

        return (
            <div className={'Loading'}>
                <div className="Loading__container">
                    <img src={"images/logo_ola_noir.png"} alt="Radio loading"/>
                </div>
            </div>
        );
    }
}
