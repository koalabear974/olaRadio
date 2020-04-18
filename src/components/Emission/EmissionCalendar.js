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
        // display the shows from 1:01am to 1am the other day
        _.map(emissions, (object) => {
            let date = new Date(object.datetime);
            if (today < date && tomorrow >= date) {
                todayEmissions.push(object);
            }
        });
        let tommorrowEmissions = [];
        _.map(emissions, (object) => {
            let date = new Date(object.datetime);
            if (tomorrow < date && dayAfter >= date) {
                tommorrowEmissions.push(object);
            }
        });
        let dayAfterEmissions = [];
        _.map(emissions, (object) => {
            let date = new Date(object.datetime);
            if (dayAfter < date && dayMax >= date) {
                dayAfterEmissions.push(object);
            }
        });

        todayEmissions = _.sortBy(todayEmissions, [function(o) { return o.datetime; }], ["desc"]);
        tommorrowEmissions = _.sortBy(tommorrowEmissions, [function(o) { return o.datetime; }], ["desc"]);
        dayAfterEmissions = _.sortBy(dayAfterEmissions, [function(o) { return o.datetime; }], ["desc"]);

        return {
            todayEmissions: todayEmissions,
            tommorrowEmissions: tommorrowEmissions,
            dayAfterEmissions: dayAfterEmissions,
        };
    }

    generateSection(date, emissionsArray) {
        let emissions = [];
        let headerText, headerClass = "";
        let onEmissionClickFunc = this.props.onEmissionClick;

        if(date === "today") {
            headerText = "Aujourd'hui";
            headerClass = "EmissionCalendar__today";
            emissions = emissionsArray.todayEmissions
        } else if (date === "tomorrow") {
            let tomorrow = new Date(this.state.fromDate).addDays(1);
            headerText = tomorrow.getDayOfWeek();
            headerClass = "EmissionCalendar__tomorrow";
            emissions = emissionsArray.tommorrowEmissions;
        } else if (date === "dayAfter") {
            let dayAfter = new Date(this.state.fromDate).addDays(2);
            headerText = dayAfter.getDayOfWeek();
            headerClass = "EmissionCalendar__dayAfter";
            emissions = emissionsArray.dayAfterEmissions;
        }

        if(emissions.length === 0 ){
            return ("");
        }

        return (
            <section className={'EmissionCalendar__section ' + headerClass}>
                <header className={'EmissionCalendar__date'}>
                    <span>{headerText}</span>
                </header>
                <div className={'EmissionCalendar__container'}>
                    {_.map(emissions, (object, key) => {
                        return (
                            <Emission
                                small={true}
                                key={'today'+key}
                                emission={object}
                                onEmissionClick={onEmissionClickFunc}
                            />
                        );
                    })}
                </div>
            </section>
        );
    }

    render() {
        const emissionsArray = this.separatePerDay(this.props.emissions);
        return (
            <div className="EmissionCalendar">
                <header className={'EmissionCalendar__title'}>Agenda</header>
                {this.generateSection("today", emissionsArray)}
                {this.generateSection("tomorrow", emissionsArray)}
                {this.generateSection("dayAfter", emissionsArray)}
            </div>
        );
    }
}
