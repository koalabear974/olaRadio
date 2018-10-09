import React, {Component} from "react";

export default class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let categoriesArray = this.props.categories;
        return (
            <table className="CategoryAdminComponent__table pure-table">
                <thead>
                <tr key={'header'}>
                    <th>Id</th>
                    <th>Categorie</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(categoriesArray).map(function(key) {
                    return (
                        <tr key={key}>
                            <td>{categoriesArray[key].id}</td>
                            <td>{categoriesArray[key].name}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    }
}
