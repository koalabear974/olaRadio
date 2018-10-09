import React, {Component} from "react";
import base from "../../db/config";
import CategoryForm from "./common/Category/CategoryForm";
import CategoryList from "./common/Category/CategoryList";

export default class CategoryAdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: {},
        };

        this.addCategory = this.addCategory.bind(this);
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

    addCategory(category) {
        const categories = {...this.state.categories};
        const id = Date.now();
        categories[id] = {
            id: id,
            name: category.name,
        };

        this.setState({categories});
    }

    render() {
        const categoriesArray = this.state.categories;

        return (
            <div className="CategoryAdminComponent">
                <CategoryList
                    categories={categoriesArray}
                />

                <CategoryForm
                    addCategory={this.addCategory}
                />
            </div>
        );
    }
}
