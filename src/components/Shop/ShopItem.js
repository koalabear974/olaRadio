import React, {Component} from "react";
import PropTypes from "prop-types";
import Responsive from 'react-responsive-decorator';
import LazyLoadingImage from '../LazyLoadingImage';

import "../../styles/components/ShopItem.css"
import {BIG_CARTEL_ID, SOLD_OUT_STATUS} from "../../api/big-cartel.api";

class ShopItem extends Component {
    static propTypes = {
        shopItem: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            currentImageId: 0
        }
    }

    switchImage() {
        const { shopItem } = this.props;
        let { currentImageId } = this.state;
        const nextImageId = ++currentImageId < shopItem.images.length ? currentImageId : 0;

        this.setState({
            currentImageId: nextImageId
        })
    }

    enableAutoChangeImage(timeChangemilis = 1000) {
        this.switchImage();

        this.timerID = setInterval(
            () => this.switchImage(),
            timeChangemilis
        );
    }

    disableAutoChangeImage() {
        clearInterval(this.timerID);

        this.setState({
            currentImageId: 0
        })
    }

    componentDidMount() {
        this.props.media({maxWidth: 768}, () => {
            this.isMobile = true;
            this.enableAutoChangeImage(1000)
        });
        this.props.media({minWidth: 768}, () => {
            this.isMobile = false;
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const { shopItem } = this.props;
        const { currentImageId } = this.state;
        const productLink = `https://${BIG_CARTEL_ID}.bigcartel.com${shopItem.url}`;
        const productAlt = `Ola Radio Vetement ${shopItem.name}`;
        const soldOut = shopItem.status === SOLD_OUT_STATUS;

        return (
            <article className={"ShopItem"}>
                <div className={"ShopItem__innerContainer"}>
                    <div className="ShopItem__imageContainer">
                        {
                            <a href={productLink} target="_blank" onMouseEnter={() => {if (!this.isMobile) this.enableAutoChangeImage()}} onMouseLeave={() => this.disableAutoChangeImage()}>
                                <LazyLoadingImage src={shopItem.images[currentImageId].url} alt={productAlt}/>
                            </a>
                        }
                    </div>
                    <a href={productLink} className="ShopItem__linkButton" target="_blank">
                        {
                            !soldOut && "Buy " + shopItem.price + "€"
                        }
                        {
                            soldOut && "Sold out"
                        }
                    </a>
                </div>
            </article>
        );
    }
}

export default Responsive(ShopItem);
