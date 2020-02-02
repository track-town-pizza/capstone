import React from "react"

// thoughts: go through info, if there is one element we may have to apply different styling, not sure
// how to handle that yet, if there are two elements it will be beautiful 
// we will have to go through the file in here

function ItemPriceDescription (description, price) {
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
            <style jsx>{`
                .description-box {
                    background: #FFEC65;
                    border-radius: 0px 0px 10px 10px;
                    overflow: auto;
                    color: #000000
                }
            `}</style>
        </div>
    )
}

export default ItemInfo