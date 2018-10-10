import React, {Component} from "react";

import "../../styles/components/Emission.css"

export default class Emission extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        let emission = this.props.emission;
        return (
            <article className="Emission">
                <div className="Emission__imageContainer">
                    <img
                        className={'Emission__image'}
                        src={emission.image}
                        alt={emission.name}
                    />
                </div>
                <header
                    className={'Emission__name'}
                >
                    {emission.name}
                </header>
                <footer
                    className={'Emission__date'}
                >
                    {(new Date()).toLocaleDateString('en-GB')}
                </footer>
            </article>
        );
    }
}
