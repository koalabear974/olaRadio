import React, {Component} from "react";
import base from "../db/config";
import _ from 'lodash';

import "../styles/Home.css"
import MainPage from "../components/MainPage/MainPage";
import EmissionList from "../components/Emission/EmissionList";
import Loading from "../components/Loading";

export default class HomePage extends Component {
  constructor(props) {
        super(props);

        this.state = {
            categories: {},
            emissions: {},
            curPage: {},
            curQuestion: {},
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
        base.fetch('questions', {
            context: this,
            then(data) {
                let curQuestion = _.find(data, (v) => {
                    return v.active;
                }) || {};
                this.setState({curQuestion: curQuestion});
            }
        });
        base.fetch('statics', {
            context: this,
            then(data) {
                let curPage = _.find(data, (v) => {
                    return v.slug === 'home';
                });
                this.setState({
                    curPage: curPage,
                });
            }
        });
    }

    isLoading() {
        return _.isEmpty(this.state.emissions) ||
            _.isEmpty(this.state.categories) ||
            _.isEmpty(this.state.curPage);
    }

    render() {
        if (this.isLoading()) {
            return <Loading />
        }
        let latestEmissions = _.filter(this.state.emissions, (o) => {return new Date(o.datetime) < new Date()});
        latestEmissions = (_.sortBy(latestEmissions, (o) => { return (o['datetime'] || 0)})).reverse().slice(0, 10);
        return (
            <div className={'Home'}>
                <MainPage
                    key={'MainPage'}
                    className={'Home__mainPage'}
                    emissions={this.state.emissions}
                    categories={this.state.categories}
                    curQuestion={this.state.curQuestion}
                    curPage={this.state.curPage}
                    onEmissionClick={this.props.onEmissionClick}
                />
                <div className={'Home__bottom'}>
                    <h2 className={'Home__secondTitle'}>
                        Derniers enregistrements
                    </h2>
                    <EmissionList
                        className={'Home__EmissionList'}
                        emissions={latestEmissions}
                        onEmissionClick={this.props.onEmissionClick}
                    />
                </div>
            </div>
        );
    }
}
