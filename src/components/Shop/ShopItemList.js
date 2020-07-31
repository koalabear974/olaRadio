import React, {Component} from "react";
import PropTypes from "prop-types";

import ShopItem from "./ShopItem";

export default class ShopItemList extends Component {
    static propTypes = {
        shopItems: PropTypes.arrayOf(PropTypes.object)
    };

    constructor(props) {
        super(props);
    }

    render() {
        const shopItemsArray = this.props.shopItemsArray.sort((a, b) => a.status.localeCompare(b.status));

        return (
            <div className="ShopItemList">
                {Object.keys(shopItemsArray).map(function (key) {
                    return (
                        <ShopItem
                            key={key}
                            shopItem={shopItemsArray[key]}
                        />
                    );
                })}
            </div>
        );
    }
}
