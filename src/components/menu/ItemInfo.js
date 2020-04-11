import React from "react"

function ItemPriceDescription (description, price) {
    if(price === "none") {
        return (
            <div className="item-price-description">
                <p className="item-description">{description}</p>
                <style jsx>{`
                    .item-price-description {
                        overflow: auto;
                    }
                    .item-description {
                        text-align: center;
                        margin-top: .9rem;
                        font-size: 18px;
                        font-weight: bold;
                    }
                `}</style>
            </div>
        )
    }
    return (
        <div className="item-price-description">
            <p className="item-description">{description}</p>
            <p className="item-price">{price}</p>
            <style jsx>{`
                .item-price-description {
                    overflow: auto;
                }
                .item-description {
                    float: left;
                    margin-bottom: .5rem;
                    margin-left: .5rem;
                    margin-top: .5rem;
                    font-size: 14px;  
                }
                .item-price {
                    float: right;
                    margin-bottom: .5rem;
                    margin-right: .5rem;
                    margin-top: .5rem;
                    font-size: 14px;
                }
            `}</style>
        </div>
    )
    
}

const ItemInfo = props => {
    const ItemInfoPriceDescriptionComponents = props.itemInformation
    .map(itemInfo => 
        ItemPriceDescription(itemInfo.description, itemInfo.price)
    )
    if(props.page === "sides") {
        return (
            <div className="description-box">
                {ItemInfoPriceDescriptionComponents}
                <style jsx>{`
                    .description-box {
                        background: #FFEC65;
                        border-radius: 0px 0px 10px 10px;
                        overflow: auto;
                        color: #000000;
                        display: table;
                        width: 100%;
                        height: 35%;
                    }
                    @media only screen and (max-width: 500px) {
                        .description-box {
                            height: auto;
                        }
                    }
                `}</style>
            </div>
        )
    }
    else if(props.page === "merchandise") {
        return (
            <div className="description-box">
                {ItemInfoPriceDescriptionComponents}
                <style jsx>{`
                    .description-box {
                        background: #FFEC65;
                        border-radius: 0px 0px 10px 10px;
                        overflow: auto;
                        color: #000000;
                        display: table;
                        width: 100%;
                        padding: 1rem;
                    }
                    @media only screen and (max-width: 1100px) {
                        .description-box {
                            height: auto;
                            padding: .25rem;
                        }
                    }
                `}</style>
            </div>
        )
    }
    else if(props.page === "pizza") {
        return (
            <div className="description-box">
                {ItemInfoPriceDescriptionComponents}
                <div className="text-center">
                    <button className="pizza-btn" type="button" name={props.itemInformation[0].description + "toppings"} onClick={props.onClick}>Toppings</button>
                    <button className="pizza-btn" type="button" name={props.itemInformation[0].description + "prices"} onClick={props.onClick}>Prices</button>
                </div>
                <style jsx>{`
                    .pizza-btn {
                        margin-right: 10px;
                        border: 0;
                        background-color: #007030;
                        color: #FFFFFF;
                        border-radius: 5px;
                        margin-bottom: .5rem;
                    }
                    .description-box {
                        background: #FFEC65;
                        border-radius: 0px 0px 10px 10px;
                        overflow: auto;
                        color: #000000;
                        display: table;
                        width: 100%;
                    }
                    @media only screen and (max-width: 600px) {
                        .description-box {
                            height: auto;
                        }
                    }
                `}</style>
            </div>
        )
    }
    else {
        return (
            <div className="description-box">
                {ItemInfoPriceDescriptionComponents}
                <style jsx>{`
                    .description-box {
                        background: #FFEC65;
                        border-radius: 0px 0px 10px 10px;
                        overflow: auto;
                        color: #000000;
                        display: table;
                        width: 100%;
                    }
                    @media only screen and (max-width: 600px) {
                        .description-box {
                            height: auto;
                        }
                    }
                `}</style>
            </div>
        )
    }  
}
export default ItemInfo