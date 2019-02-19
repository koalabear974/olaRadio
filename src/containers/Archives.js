import React, { Component} from "react";
import _ from "lodash";
import base from "../db/config";

export default class Archives extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: {},
            emissions: {},
        };


        this.isLoading = this.isLoading.bind(this);
    }

    componentDidMount() {
        base.fetch('emissions', {
            context: this,
            then(data) {
                this.setState({emissions: data});
            }
        });
        base.fetch('categories', {
            context: this,
            then(data) {
                this.setState({categories: data});
            }
        });
    }

    isLoading() {
        return _.isEmpty(this.state.emissions) ||
            _.isEmpty(this.state.categories);
    }


    render() {
        if (this.isLoading()) {
            return <div className={'Loading'}>
                <img
                    className={'Loading__logo'}
                    src={'images/logo_black.svg'}
                    alt={'Olaradio logo'}
                />
            </div>
        }
        let categories = this.state.categories;
        console.log(categories);

        return (
            <div>Archives</div>
        );
    }
}
