import React, {Component} from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import handleViewport from 'react-in-viewport';

class LazyLoadingImage extends Component {

    render() {
        const { inViewport, enterCount } = this.props;
        const { src, alt } = this.props;

        return (
                <span>
                    {
                        (inViewport || (!inViewport && enterCount > 0)) &&
                            <img
                                src={src}
                                alt={alt}
                            />
                    }
                </span>
        );
    }
}

export default handleViewport(LazyLoadingImage);
