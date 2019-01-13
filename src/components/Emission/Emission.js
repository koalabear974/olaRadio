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
        //TODO change to proper verification
        let isFeatured = (this.props.emission.categories || []).includes("1539086792337");

        if (this.props.small) {
            return (
                <article className={"Emission--small"+ (isFeatured ? ' Emission--featured' : '')}>
                    <footer
                        className={'Emission__date'}
                    >
                        {(new Date(emission.datetime)).getTimeFormated()}
                    </footer>
                    {
                        (emission.link && emission.link !== "") ?
                        <header className={'Emission__name'}><a target={'_blank'} href={emission.link}>{emission.name}</a></header> :
                        <header className={'Emission__name'}>{emission.name}</header>
                    }
                </article>
            );
        }

        return (
            <article className={"Emission"}>
                <div className="Emission__imageContainer">
                    {
                        (emission.link && emission.link !== "") ?
                            <a target={'_blank'} href={emission.link}><img
                                className={'Emission__image'}
                                src={emission.image}
                                alt={emission.name}
                            /></a> :
                            <img
                                className={'Emission__image'}
                                src={emission.image}
                                alt={emission.name}
                            />
                    }
                </div>
                {
                    (emission.link && emission.link !== "") ?
                        <header className={'Emission__name'}><a target={'_blank'} href={emission.link}>{emission.name}</a></header> :
                        <header className={'Emission__name'}>{emission.name}</header>
                }
                <footer
                    className={'Emission__date'}
                >
                    {(new Date(emission.datetime)).getFormated()}
                </footer>
            </article>
        );
    }
}
