import React, {Component, Fragment} from "react";
import base from "../../db/config";
import {FaPlus} from "react-icons/fa/index";
import _ from "lodash";
import EmissionForm from "./common/Emission/EmissionForm";
import EmissionList from "./common/Emission/EmissionList";

export default class EmissionAdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: {},
            emissions: {},
            currentEmission: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
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

    handleSubmit(emission) {
        const emissions = {...this.state.emissions};
        const id = emission.id ? emission.id : Date.now();
        let curEmission = emission;
        curEmission['id'] = id;
        emissions[id] = curEmission;

        this.setState({
            emissions: emissions,
            currentEmission: {},
        });
    }


    handleEditClick(key) {
        this.setState({
            currentEmission: this.state.emissions[key]
        });
    }

    render() {
        const emissionsArray = this.state.emissions;
        const currentEmission = this.state.currentEmission;
        const categoriesArray = this.state.categories;

        if (_.isEmpty(categoriesArray)) {
            return <div>loading</div>;
        }

        return (
            <div className="EmissionAdminComponent">
                <EmissionList
                    categories={categoriesArray}
                    emissions={emissionsArray}
                    handleEditClick={this.handleEditClick}
                />

                <EmissionForm
                    categories={categoriesArray}
                    editEmission={currentEmission}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}
