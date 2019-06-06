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
                <div className="Loading__videoContainer">
                    <video width="320" height="240" autoPlay loop muted playsinline preload="yes">
                        <source src={'images/radioAnimated2.mp4'} type="video/mp4" />
                    </video>
                </div>
            </div>
        );
    }
}
