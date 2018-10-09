import React, {Component} from "react";
import _ from "lodash";

export default class EmissionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const emissionsArray = this.props.emissions;
        const categoriesArray = this.props.categories;
        return (
            <table className="EmissionAdminComponent__table pure-table-bordered pure-table">
                <thead>
                <tr key={'header'}>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Catégories</th>
                    <th>Contenu</th>
                    <th>Image</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(emissionsArray).map(function(key) {
                    return (
                        <tr key={key}>
                            <td>{emissionsArray[key].id}</td>
                            <td>{emissionsArray[key].name}</td>
                            <td>{emissionsArray[key].categories.map((catId) => {
                                return categoriesArray[catId].name;
                            }).join()}</td>
                            <td>{emissionsArray[key].contenu}</td>
                            <td>{emissionsArray[key].image}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    }
}
