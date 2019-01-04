import React, {Component} from "react";
import base from "../../db/config";
import CategoryForm from "./common/Category/CategoryForm";
import CategoryList from "./common/Category/CategoryList";
import _ from "lodash";

export default class CategoryAdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: {},
            emissions: {},
            editCategory: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this.categoriesRef = base.syncState('categories', {
            context: this,
            state: 'categories'
        });
        this.emissionsRef = base.syncState('emissions', {
            context: this,
            state: 'emissions'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.categoriesRef);
        base.removeBinding(this.emissionsRef);
    }

    handleSubmit(category) {
        const categories = {...this.state.categories};
        const id = category.id ? category.id : Date.now();
        categories[id] = {
            id: id,
            name: category.name,
        };

        this.setState({
            categories: categories,
            editCategory: {},
        });
    }

    handleDelete(id) {
        let emissions = this.state.emissions;

        // remove categories in emissions if used
        _.each(emissions, (emission, key) => {
            if(_.includes(emission.categories, id.toString())) {
                let c = emission.categories;
                _.remove(c, (c) => c === id.toString());
                emission.categories = c;
                emissions[key] = emission;
            }
        });

        base.remove('categories/'+id);
        let categories = _.omit(this.state.categories, [id]);
        this.setState({
            categories: categories,
            emissions: emissions,
            editCategory: {},
        });
    }

    handleEditClick(key) {
        this.setState({
            editCategory: this.state.categories[key]
        });
    }

    render() {
        const categoriesArray = this.state.categories;
        let editCategory = this.state.editCategory;

        return (
            <div className="CategoryAdminComponent">
                <CategoryList
                    categories={categoriesArray}
                    handleEditClick={this.handleEditClick}
                />

                <CategoryForm
                    editCategory={editCategory}
                    handleSubmit={this.handleSubmit}
                    handleDelete={this.handleDelete}
                />
            </div>
        );
    }
}
