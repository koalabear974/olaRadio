import React, { Component } from "react";
import base from "../db/config";
import EmissionList from "../components/Emission/EmissionList";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        categories: {},
        emissions: {},
    };
  }

    componentWillMount() {
        this.emissionsRef = base.syncState('emissions', {
            context: this,
            state: 'emissions'
        });
        this.categoriesRef = base.syncState('categories', {
            context: this,
            state: 'categories'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.emissionsRef);
        base.removeBinding(this.categoriesRef);
    }

  render() {
    return (
      <div className={'Home'}>
        <EmissionList
            emissions={this.state.emissions}
        />
      </div>
    );
  }
}
