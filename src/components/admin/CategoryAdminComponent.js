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
    }

    componentWillUnmount() {
        base.removeBinding(this.categoriesRef);
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
        base.remove('categories/'+id);
        let categories = _.omit(this.state.categories, [id]);
        this.setState({
            categories: categories,
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
