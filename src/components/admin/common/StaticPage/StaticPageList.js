import React, {Component} from "react";
import {FaEdit} from "react-icons/fa/index";
import PropTypes from "prop-types";

export default class StaticPageList extends Component {
    static propTypes = {
        staticPages: PropTypes.object,
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
        let staticArray = this.props.staticPages;
        let that = this;
        return (
            <table className="CategoryAdminComponent__table table">
                <thead>
                <tr key={'header'}>
                    <th>Id</th>
                    <th>Slug</th>
                    <th>Titre</th>
                    <th>Textes</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(staticArray).map(function(key) {
                    return (
                        <tr key={key}>
                            <td className={'table__td--small qw'}>{staticArray[key].id}</td>
                            <td>{staticArray[key].slug}</td>
                            <td>{staticArray[key].title}</td>
                            <td>
                                <ul>
                                    {(staticArray[key].texts || []).map((v, i) => {
                                        return <li key={staticArray[key].id+i+v}>{v}</li>
                                    })}
                                </ul>
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
