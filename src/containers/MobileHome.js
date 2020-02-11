import React, {Component} from "react";
import base from "../db/config";
import _ from 'lodash';

import "../styles/MobileHome.css"
import EmissionList from "../components/Emission/EmissionList";
import {FaAngleDown, FaAngleUp} from "react-icons/fa/index";
import EmissionCalendar from "../components/Emission/EmissionCalendar";
import AccordionWithHeader from "react-accordion-with-header/es/AccordionWithHeader";
import AccordionNode from "react-accordion-with-header/es/AccordionNode";
import AccordionHeader from "react-accordion-with-header/es/AccordionHeader";
import AccordionPanel from "react-accordion-with-header/es/AccordionPanel";
import InformationPanel from "./InformationPanel";
import Archives from "./Archives";
import Information from "./Information";
import Loading from "../components/Loading";

export default class MobileHome extends Component {
  constructor(props) {
        super(props);

        this.state = {
            categories: {},
            emissions: {},
            homePage: {},
            infoPage: {},
            curQuestion: {},
            currentPageState: {},
        };

        this.isLoading = this.isLoading.bind(this);
        this.isActivePage = this.isActivePage.bind(this);
        this.actionCallback = this.actionCallback.bind(this);
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
                let homePage = _.find(data, (v) => {
                    return v.slug === 'home';
                });
                let infoPage = _.find(data, (v) => {
                    return v.slug === 'infos';
                });
                this.setState({
                    homePage: homePage,
                    infoPage: infoPage,
                });
            }
        });
    }

    isActivePage(key) {
        let panel = _.find(this.state.currentPageState, (item) => {
            return item.panel === key;
        });
        return panel ? panel.open : false;
    }

    actionCallback(panels) {
        this.setState({currentPageState: panels})
    }

    isLoading() {
        return _.isEmpty(this.state.emissions) ||
            _.isEmpty(this.state.categories) ||
            _.isEmpty(this.state.homePage);
    }

    render() {
        if (this.isLoading()) {
            return (<Loading />);
        }
        let latestEmissions = _.filter(this.state.emissions, (o) => {return (new Date(o.datetime) < new Date()) && (o.link != false)});
        latestEmissions = (_.sortBy(latestEmissions, (o) => { return (o['datetime'] || 0)})).reverse().slice(0, 10);
        let homePage = this.state.homePage;
        let infoPage = this.state.infoPage;

        return (
            <div className={'MobileHome'}>
                <AccordionWithHeader className={"MobileHome__navigator"} actionCallback={this.actionCallback}>
                    <AccordionNode className={'MobileNavigator__item MobileNavigator__item--black'} key={0}>
                        <AccordionHeader
                            className={'MobileNavigator__title'}
                            horizontalAlignment="left"
                            verticalAlignment="center"
                        >
                            <h3>Agenda</h3>
                            { this.isActivePage(0) ? <FaAngleUp /> : <FaAngleDown /> }
                        </AccordionHeader>
                        <AccordionPanel className={'MobileNavigator__content'}>
                            <EmissionCalendar
                                emissions={this.state.emissions}
                                onEmissionClick={this.props.onEmissionClick}
                            />
                        </AccordionPanel>
                    </AccordionNode>
                    <AccordionNode className={'MobileNavigator__item MobileNavigator__item--white'} key={1}>
                        <AccordionHeader
                            className={'MobileNavigator__title'}
                            horizontalAlignment="left"
                            verticalAlignment="center"
                        >
                            <h3>News</h3>
                            { this.isActivePage(1) ? <FaAngleUp /> : <FaAngleDown /> }
                        </AccordionHeader>
                        <AccordionPanel className={'MobileNavigator__content'}>
                            <aside className={'NewsBox'}>
                                <header className={'NewsBox__header'}>
                                    {homePage.title}
                                </header>
                                <article className={'NewsBox__text'}>
                                    {homePage.texts[0]}
                                </article>
                            </aside>
                        </AccordionPanel>
                    </AccordionNode>
                    <AccordionNode className={'MobileNavigator__item MobileNavigator__item--black'} key={2}>
                        <AccordionHeader
                            className={'MobileNavigator__title'}
                            horizontalAlignment="left"
                            verticalAlignment="center"
                        >
                            <h3>Informations</h3>
                            { this.isActivePage(2) ? <FaAngleUp /> : <FaAngleDown /> }
                        </AccordionHeader>
                        <AccordionPanel className={'MobileNavigator__content'}>
                            <Information infoPage={infoPage}/>
                        </AccordionPanel>
                    </AccordionNode>
                    <AccordionNode className={'MobileNavigator__item MobileNavigator__item--white'} key={3}>
                        <AccordionHeader
                            className={'MobileNavigator__title'}
                            horizontalAlignment="left"
                            verticalAlignment="center"
                        >
                            <h3>Podcasts</h3>
                            { this.isActivePage(3) ? <FaAngleUp /> : <FaAngleDown /> }
                        </AccordionHeader>
                        <AccordionPanel className={'MobileNavigator__content'}>
                            <Archives
                                onEmissionClick={this.props.onEmissionClick}
                                categories={this.state.categories}
                                emissions={this.state.emissions}
                            />
                        </AccordionPanel>
                    </AccordionNode>
                    <div className={'MobileNavigator__item MobileNavigator__item--black'} key={3}>
                        <a href='https://www.helloasso.com/associations/ola-radio/formulaires/1/widget' target='_blank'>
                            <div className={'MobileNavigator__title'}>
                                <h3>Donate</h3>
                            </div>
                        </a>
                    </div>
                </AccordionWithHeader>

                <div className={'MobileHome__bottom'}>
                    <h2 className={'MobileHome__secondTitle'}>
                        Derniers enregistrements
                    </h2>
                    <EmissionList
                        className={'MobileHome__EmissionList'}
                        emissions={latestEmissions}
                        onEmissionClick={this.props.onEmissionClick}
                    />
                </div>
            </div>
        );
    }
}
