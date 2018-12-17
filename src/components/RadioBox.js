import React, {Component} from "react";

import Marquee from 'react-text-marquee';

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
                    <header className={'Emission__title'}>
                        <Marquee
                            hoverToStop={true}
                            loop={false}
                            leading={5}
                            trailing={5}
                            text="Titre de l'émission défilant"
                        />

                    </header>
                    <body className={'Emission__sub-container'}>
                        <div className={'Emission__subtitle'}>
                            <Marquee
                                hoverToStop={true}
                                loop={false}
                                leading={5}
                                trailing={5}
                                text="sous-titre de l\'émission défilant"
                            />
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
