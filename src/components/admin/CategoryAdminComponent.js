import React, {Component} from "react";
import base from "../../db/config";
import CategoryForm from "./common/Category/CategoryForm";
import CategoryList from "./common/Category/CategoryList";

export default class CategoryAdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: {},
            currentCategory: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
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
            currentCategory: {},
        });
    }

    handleEditClick(key) {
        this.setState({
            currentCategory: this.state.categories[key]
        });
    }

    render() {
        const categoriesArray = this.state.categories;
        let currentCategory = this.state.currentCategory;

        return (
            <div className="CategoryAdminComponent">
                <CategoryList
                    categories={categoriesArray}
                    handleEditClick={this.handleEditClick}
                />

                <CategoryForm
                    editCategory={currentCategory}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}
