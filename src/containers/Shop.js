import React, {Component} from "react";
import ShopItemList from "../components/Shop/ShopItemList";
import "../styles/Shop.css"
import {getProductList} from "../api/big-cartel.api";
import Loading from "../components/Loading";

export default class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {shopItemsArray: this.props.shopItemsArray || undefined};
    }

    componentDidMount() {
        if(this.props.shopItemsArray === undefined) {
            getProductList()
                .then(response => {
                    this.setState({
                        shopItemsArray: response.data
                    })
                })
                .catch(error => {
                    this.setState({
                        error: true
                    })
                })
        }
    }

    isLoading() {
        return !this.state.shopItemsArray;
    }

    render() {
        if (this.isLoading()) {
            return <Loading />
        }

        const { shopItemsArray, error } = this.state;

        return (
            <div className={'Shop'}>
                {
                    shopItemsArray.length > 0 &&
                    <ShopItemList shopItemsArray={shopItemsArray}/>
                }
                {
                    error &&
                    <div>
                        <h2>
                            An Error happened while trying to get the shop data
                        </h2>
                    </div>
                }
                {
                    !error &&
                    shopItemsArray.length === 0 &&
                    <div>
                        <h2>
                            This shop is empty
                        </h2>
                    </div>
                }
            </div>
        );
    }
}
