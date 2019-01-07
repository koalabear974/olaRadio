import React, {Component} from "react";
import {FaEdit} from "react-icons/fa/index";
import PropTypes from "prop-types";
import _ from 'lodash';

export default class EmissionList extends Component {
    static propTypes = {
        categories: PropTypes.object,
        handleEditClick: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
        };
        this.onEditClick = this.onEditClick.bind(this);
    }

    onEditClick(key){
        this.props.handleEditClick(key);
    }

    render() {
        const emissionsArray = this.props.emissions;
        const categoriesArray = this.props.categories;
        let that = this;
        return (
            <table className="EmissionAdminComponent__table table">
                <thead>
                <tr key={'header'}>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Contenu</th>
                    <th>Image</th>
                    <th>Date</th>
                    <th>Catégories</th>
                    <th>Link</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(emissionsArray).map(function(key) {
                    return (
                        <tr key={key}>
                            <td className={'table__td--small'}>{emissionsArray[key].id}</td>
                            <td>{emissionsArray[key].name}</td>
                            <td>{emissionsArray[key].contenu}</td>
                            <td className={'table__td--small'}>
                                <img className={'table__image'} src={emissionsArray[key].image} alt={"emission"+key}/>
                            </td>
                            <td>{emissionsArray[key].datetime}</td>
                            <td>{!_.isEmpty(emissionsArray[key].categories) && emissionsArray[key].categories.map((catId) => {
                                return categoriesArray[catId].name;
                            }).join()}</td>
                            <td>
                                {
                                    emissionsArray[key].link ?
                                        <a href={emissionsArray[key].link}>click</a> :
                                        ''
                                }
                            </td>
                            <td>
                                <button
                                    className={'button'}
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
