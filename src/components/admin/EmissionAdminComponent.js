import React, {Component} from "react";
import base from "../../db/config";
import _ from "lodash";
import EmissionForm from "./common/Emission/EmissionForm";
import EmissionList from "./common/Emission/EmissionList";

export default class EmissionAdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: {},
            emissions: {},
            editEmission: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    componentWillMount() {
        this.emissionsRef = base.syncState('emissions', {
            context: this,
            state: 'emissions',
        });
        this.categoriesRef = base.syncState('categories', {
            context: this,
            state: 'categories',
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
            editEmission: {},
        });
    }


    handleEditClick(id) {
        this.setState({
            editEmission: this.state.emissions[id]
        });
    }

    handleDeleteClick(id) {
        base.remove('emissions/'+id);
        let emissions = _.omit(this.state.emissions, [id]);
        this.setState({
            emissions: emissions,
            editEmission: {},
        });
    }

    render() {
        let emissionsArray = this.state.emissions;
        emissionsArray = (_.sortBy(emissionsArray, (o) => { return (o['datetime'] || 0)})).reverse();
        const categoriesArray = this.state.categories;
        const editEmission = this.state.editEmission;

        if (_.isEmpty(categoriesArray) || _.isEmpty(emissionsArray)) {
            return <div className={'Loading'}>
                <img
                    className={'Loading__logo'}
                    src={'images/logo_black.svg'}
                    alt={'Olaradio logo'}
                />
            </div>;
        }

        return (
            <div className="EmissionAdminComponent">
                <EmissionList
                    categories={categoriesArray}
                    emissions={emissionsArray}
                    handleEditClick={this.handleEditClick}
                    handleDeleteClick={this.handleDeleteClick}
                />

                <EmissionForm
                    categories={categoriesArray}
                    editEmission={editEmission}
                    handleSubmit={this.handleSubmit}
                    handleDelete={this.handleDeleteClick}
                />
            </div>
        );
    }
}
