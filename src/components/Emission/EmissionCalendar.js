import React, {Component} from "react";
import Emission from "./Emission";
import _ from 'lodash';

import "../../styles/components/Emission.css"

export default class EmissionCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fromDate: new Date().startOfDay(),
        };

        this.separatePerDay = this.separatePerDay.bind(this);
    }

    separatePerDay(emissions) {
        let today = this.state.fromDate;
        let tomorrow = new Date(today).addDays(1).getTime();
        let dayAfter = new Date(today).addDays(2).getTime();
        let dayMax = new Date(today).addDays(3).getTime();
        let todayEmissions = [];
        _.map(emissions, (object) => {
            let date = new Date(object.datetime);
            if (today < date && tomorrow > date) {
                todayEmissions.push(object);
            }
        });
        let tommorrowEmissions = [];
        _.map(emissions, (object) => {
            let date = new Date(object.datetime);
            if (tomorrow < date && dayAfter > date) {
                tommorrowEmissions.push(object);
            }
        });
        let dayAfterEmissions = [];
        _.map(emissions, (object) => {
            let date = new Date(object.datetime);
            if (dayAfter < date && dayMax > date) {
                dayAfterEmissions.push(object);
            }
        });

        return {
            todayEmissions: todayEmissions,
            tommorrowEmissions: tommorrowEmissions,
            dayAfterEmissions: dayAfterEmissions,
        };
    }

    render() {
        const emissionsArray = this.separatePerDay(this.props.emissions);
        let tomorrow = new Date(this.state.fromDate).addDays(1);
        let dayAfter = new Date(this.state.fromDate).addDays(2);
        return (
            <div className="EmissionCalendar">
                <header className={'EmissionCalendar__title'}>Agenda</header>
                <section className={'EmissionCalendar__section EmissionCalendar__today'}>
                    <header className={'EmissionCalendar__date'}>
                        <span>Aujourd'hui</span>
                    </header>
                    <div className={'EmissionCalendar__container'}>
                        {_.map(emissionsArray.todayEmissions, (object, key) => {
                            return (
                                <Emission
                                    small={true}
                                    key={'today'+key}
                                    emission={object}
                                />
                            );
                        })}
                    </div>
                </section>
                <section className={'EmissionCalendar__section EmissionCalendar__tomorrow'}>
                    <header className={'EmissionCalendar__date'}>
                        <span>{tomorrow.getDayOfWeek()} {tomorrow.getFormated()}</span>
                    </header>
                    <div className={'EmissionCalendar__container'}>
                        {_.map(emissionsArray.tommorrowEmissions, (object, key) => {
                            return (
                                <Emission
                                    small={true}
                                    key={'tomorrow'+key}
                                    emission={object}
                                />
                            );
                        })}
                    </div>
                </section>
                <section className={'EmissionCalendar__section EmissionCalendar__dayAfter'}>
                    <header className={'EmissionCalendar__date'}>
                        <span>{dayAfter.getDayOfWeek()} {dayAfter.getFormated()}</span>
                    </header>
                    <div className={'EmissionCalendar__container'}>
                        {_.map(emissionsArray.dayAfterEmissions, (object, key) => {
                            return (
                                <Emission
                                    small={true}
                                    key={'dayAfter'+key}
                                    emission={object}
                                />
                            );
                        })}
                    </div>
                </section>
            </div>
        );
    }
}
