import React, {Component} from "react";
import {FaEdit} from "react-icons/fa/index";
import PropTypes from "prop-types";
import _ from 'lodash';
import Paginator from "../forms/Paginator";

const PAGEOFFSET = 10;

export default class EmissionList extends Component {

    static propTypes = {
        categories: PropTypes.object,
        handleEditClick: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
        };
        this.onEditClick = this.onEditClick.bind(this);
        this.onPageClick = this.onPageClick.bind(this);
    }

    onEditClick(key){
        this.props.handleEditClick(key);
    }

    onPageClick(page) {
        this.setState({currentPage: parseInt(page)});
    }

    getCurrentEmissionArray() {
        let curOffset = this.state.currentPage * PAGEOFFSET;
        return this.props.emissions.slice(curOffset, curOffset + PAGEOFFSET);
    }

    render() {
        const categoriesArray = this.props.categories;
        let curEmissionsArray = this.getCurrentEmissionArray();

        let that = this;
        return (
            <div>
                <table className="EmissionAdminComponent__table table">
                    <thead>
                    <tr key={'header'}>
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
                    {Object.keys(curEmissionsArray).map(function(key) {
                        return (
                            <tr key={key}>
                                <td>{curEmissionsArray[key].name}</td>
                                <td>{curEmissionsArray[key].contenu}</td>
                                <td className={'table__td--small'}>
                                    <img className={'table__image'} src={curEmissionsArray[key].image} alt={"emission"+key}/>
                                </td>
                                <td>{curEmissionsArray[key].datetime}</td>
                                <td>{!_.isEmpty(curEmissionsArray[key].categories) && curEmissionsArray[key].categories.map((catId) => {
                                    return categoriesArray[catId].name;
                                }).join()}</td>
                                <td>
                                    {
                                        curEmissionsArray[key].link ?
                                            <a href={curEmissionsArray[key].link} target={'_blank'}>click</a> :
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
                <Paginator
                    currentPage={this.state.currentPage}
                    maxPage={Math.ceil(this.props.emissions.length/PAGEOFFSET)}
                    onPageClick={this.onPageClick} />
            </div>
        );
    }
}
