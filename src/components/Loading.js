import React, {Component} from "react";

import "./../styles/components/Logo.css";

function detectMob() {
    return !!(navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i));
}

export default class Loading extends Component {
    static propTypes = {
    };

    render() {
        if(detectMob()) {
            return (
                <div className={'Loading'}>
                    <div className="Loading__videoContainer">
                        <img src={"images/radioAnimated.png"} alt="Radio loading"/>
                    </div>
                </div>
            );
        }

        return (
            <div className={'Loading'}>
                <div className="Loading__container">
                    <img src={"images/logo_white_text.svg"} alt="Radio loading"/>
                </div>
            </div>
        );
    }
}
