import React, {Component} from "react";

import "../styles/Home.css"

export default class FullTeaserPage extends Component {
    constructor(props) {
        super(props);


        this.state = {
            rotation: 0,
        };

        this.animateRotation = this.animateRotation.bind(this);
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.animateRotation();
        });
    }

    animateRotation() {
        let rotation = this.state.rotation +1;
        this.setState({rotation: rotation});
        requestAnimationFrame(() => {
            this.animateRotation();
        });
    }


    render() {
        return (
            <div className={'Teaser'}>
                <img
                    className={'Teaser__logo'}
                    src={'images/logo.png'}
                    alt={'Olaradio logo'}
                />
                <span
                    className={'Teaser__text'}
                >
                            Comming soon...
                        </span>
                <div
                    className="TurnTable"
                    style={{
                        transform: 'rotate(' + this.state.rotation + 'deg)',
                        transition: 'all 0.5s',
                    }}
                >
                    <div className="TurnTable__disk"></div>
                </div>
            </div>
        );
    }
}
