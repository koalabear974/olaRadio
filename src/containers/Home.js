import React, {Component} from "react";
import base from "../db/config";
import EmissionList from "../components/Emission/EmissionList";

import "../styles/Home.css"
import MainPage from "../components/MainPage/MainPage";

export default class HomePage extends Component {
  constructor(props) {
        super(props);

        this.state = {
            categories: {},
            emissions: {},
            questions: {},
        };
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
                this.setState({questions: data});
                console.log('data');
            }
        });
    }

    render() {
        return (
            <div className={'Home'}>
                <MainPage
                    key={'MainPage'}
                    className={'Home__mainPage'}
                    emissions={this.state.emissions}
                    categories={this.state.categories}
                    questions={this.state.questions}
                />
                <div className={'Home__bottom'}>
                    <h2 className={'Home__secondTitle'}>
                        Derniers enregistrements
                    </h2>
                    <EmissionList
                        className={'Home__EmissionList'}
                        emissions={this.state.emissions}
                    />
                </div>
            </div>
        );
    }
}
