import React, {Component} from "react";
import base from "../../db/config";
import StaticPageForm from "./common/StaticPage/StaticPageForm";
import StaticPageList from "./common/StaticPage/StaticPageList";
import _ from "lodash";

export default class StaticAdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staticPages: {},
            editStatic: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this.staticPageRef = base.syncState('statics', {
            context: this,
            state: 'staticPages'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.staticPageRef);
    }

    handleSubmit(staticPage) {
        const staticPages = {...this.state.staticPage};
        const id = staticPage.id ? staticPage.id : Date.now();
        staticPage['id'] = id;
        staticPages[id] = staticPage;

        this.setState({
            staticPages: staticPages,
            editStatic: {},
        });
    }

    handleDelete(id) {
        base.remove('statics/'+id);
        let staticPage = _.omit(this.state.staticPage, [id]);
        this.setState({
            staticPage: staticPage,
            editStatic: {},
        });
    }

    handleEditClick(key) {
        this.setState({
            editStatic: this.state.staticPages[key]
        });
    }

    render() {
        const staticPageArray = this.state.staticPages;
        let editStatic = this.state.editStatic;

        console.log(editStatic);
        console.log(staticPageArray);
        return (
            <div className="StaticAdminComponent">
                <StaticPageList
                    staticPages={staticPageArray}
                    handleEditClick={this.handleEditClick}
                />

                <StaticPageForm
                    editStatic={editStatic}
                    handleSubmit={this.handleSubmit}
                    handleDelete={this.handleDelete}
                />
            </div>
        );
    }
}
