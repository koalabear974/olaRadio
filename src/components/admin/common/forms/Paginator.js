import React, {Component} from "react";
import PropTypes from "prop-types";

export default class Paginator extends Component {
    static propTypes = {
        currentPage: PropTypes.number,
        maxPage: PropTypes.number,
        onPageClick: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
        };

        this.onPageClick = this.onPageClick.bind(this);
    }

    componentDidUpdate() {
        console.log("update");
        console.log(this.props);
    }

    onPageClick(event) {
        event.preventDefault();
        this.props.onPageClick(event.target.dataset.page);
    }

    render() {
        let pages = [];
        for(let i = 0 ; i < this.props.maxPage; i++) {
            pages.push(
                <li key={"pagination-li-"+i}>
                    <a
                        key={"pagination-"+i}
                        className={"pagination-link " + (this.props.currentPage === i ? "is-current" : "")}
                        aria-label={"Page "+ (i+1)}
                        aria-current="page"
                        data-page={i}
                        onClick={this.onPageClick}
                    >{ i+1 }</a>
                </li>
            );
        }

        return (
            <nav className="pagination" role="navigation" aria-label="pagination">
                <ul className="pagination-list">
                    {
                        pages
                    }
                </ul>
            </nav>
        );
    }
}
