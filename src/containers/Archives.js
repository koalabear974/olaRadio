import React, {Component} from "react";
import _ from "lodash";
import base from "../db/config";
import EmissionList from "../components/Emission/EmissionList";

import "../styles/Archive.css"

export default class Archives extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: {},
            emissions: {},
        };


        this.isLoading = this.isLoading.bind(this);
        this.displaySection = this.displaySection.bind(this);
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

    displaySection(section) {
        section.emissions = (_.sortBy(section.emissions, (o) => { return (o['datetime'] || 0)})).reverse();
        return (
          <div className={'Archive__section'} key={section.category.id}>
              <h2 className={'Archive__section-title'}>{section.category.name}</h2>
              {
                  (section.emissions && section.emissions.length > 0) ?
                      <EmissionList
                          className={'Archive__EmissionList'}
                          emissions={section.emissions}
                      />
                      : "À venir"
              }
          </div>
        );
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
        let emissions = this.state.emissions;
        let sections = [];
        _.forEach(categories, (category) => {
            let catId = String(category.id);
            let concernedEmissions = _.filter(emissions, (emission) => {
                return (emission.categories || []).includes(catId);
            });
            sections.push({category: category, emissions: concernedEmissions});
        });

        return (
            <div className={'Archive'}>
                {
                    _.map(sections, (section) => {
                        return this.displaySection(section);
                    })
                }
            </div>
        );
    }
}
