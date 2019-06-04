import React, {Component} from "react";

import "./../styles/components/Logo.css";

export default class Loading extends Component {
    static propTypes = {
    };

    render() {
        return (
            <div className={'Loading'}>
                <div className="Loading__videoContainer">
                    <video width="320" height="240" autoPlay={"autoPlay"} loop>
                        <source src={'images/loading.mp4'} type="video/mp4" />
                    </video>
                </div>
            </div>
        );
    }
}
