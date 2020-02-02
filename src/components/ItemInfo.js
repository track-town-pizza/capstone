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
                        margin-top: .5rem;
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
                }
                .item-price {
                    float: right;
                    margin-bottom: .5rem;
                    margin-right: .5rem;
                    margin-top: .5rem;
                }
            `}</style>
        </div>
    )
<<<<<<< HEAD
    
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
                    @media only screen and (max-width: 600px) {
                        .description-box {
                            height: auto;
                        }
                    }
                `}</style>
            </div>
        )
    }

    return (
        <div className="description-box">
            {ItemInfoPriceDescriptionComponents}
=======
}

const ItemInfo = props => {
    // console.log(props.itemInformation)
    const ItemInfoPriceDescriptionComponents = props.itemInformation
                                                .map(itemInfo => 
                                                    ItemPriceDescription(itemInfo.description, itemInfo.price)
                                                )
    return (
        <div className="description-box">
            {ItemInfoPriceDescriptionComponents}
            {/* <div className="item-price-description">
                <p className="item-description">Cheesy Garlic Sticks</p>
                <p className="item-price">$5.50</p>
            </div>
            <div className="item-price-description">
                <p className="item-description">Garlic Sticks</p>
                <p className="item-price">$5.00</p>
            </div> */}
>>>>>>> rough version of items is working with breaking it up into components
            <style jsx>{`
                .description-box {
                    background: #FFEC65;
                    border-radius: 0px 0px 10px 10px;
                    overflow: auto;
<<<<<<< HEAD
                    color: #000000;
                    display: table;
                    width: 100%;
                    height: 35%;
                }
                @media only screen and (max-width: 600px) {
                    .description-box {
                        height: auto;
                    }
=======
                    color: #000000
>>>>>>> rough version of items is working with breaking it up into components
                }
            `}</style>
        </div>
    )
<<<<<<< HEAD
    
}
=======
}

>>>>>>> rough version of items is working with breaking it up into components
export default ItemInfo