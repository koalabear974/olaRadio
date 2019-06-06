import React, {Component} from "react";

import "./../styles/components/Logo.css";

export default class Loading extends Component {
    static propTypes = {
    };

    render() {
        return (
            <div className={'Loading'}>
                <div className="Loading__videoContainer">
                    <video width="320" height="240" autoPlay loop muted>
                        <source src={'images/radioAnimated2.mp4'} type="video/mp4" />
                    </video>
                </div>
            </div>
        );
    }
}
