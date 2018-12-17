import React, {Component} from "react";
import {FaEdit} from "react-icons/fa/index";
import PropTypes from "prop-types";

export default class CategoryList extends Component {
    static propTypes = {
        categories: PropTypes.arrayOf(Object),
        handleEditClick: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {};
        this.onEditClick = this.onEditClick.bind(this);
    }

    onEditClick(key){
        this.props.handleEditClick(key);
    }

    render() {
        let categoriesArray = this.props.categories;
        let that = this;
        return (
            <table className="CategoryAdminComponent__table pure-table">
                <thead>
                <tr key={'header'}>
                    <th>Id</th>
                    <th>Categorie</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(categoriesArray).map(function(key) {
                    return (
                        <tr key={key}>
                            <td>{categoriesArray[key].id}</td>
                            <td>{categoriesArray[key].name}</td>
                            <td>
                                <button
                                    className={'pure-button pure-button-primary pure-input-1-2'}
                                    onClick={() => that.onEditClick(key)}
                                >
                                    <FaEdit />
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    }
}
