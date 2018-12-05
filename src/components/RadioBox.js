import React, {Component} from "react";
import PropTypes from "prop-types";
import TextTicker from 'react-native-text-ticker';


import "./../styles/components/RadioBox.css";

export default class RadioBox extends Component {
    static propTypes = {
    };

    render() {
        return (
            <div className={'RadioBox'}>
                <h3 className={'RadioBox__head'}>
                    Direct
                </h3>
                <article className={'RadioBox__emission'}>
                    <header className={'Emission__title scroll-left'}>
                        <TextTicker>
                            Titre de l'émission défilant
                        </TextTicker>
                    </header>
                    <body className={'Emission__sub-container'}>
                        <div className={'Emission__subtitle scroll-left'}>
                            <TextTicker>
                                sous-titre de l'émission défilant
                            </TextTicker>
                        </div>
                        <footer className={'Emission__date'}>
                            - date
                        </footer>
                    </body>
                </article>

                <div className={'RadioBox__player'}>
                    &#9613; &#9613;
                </div>
            </div>
        );
    }
}
