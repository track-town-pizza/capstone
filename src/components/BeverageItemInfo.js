import React from "react"

function ItemPriceDescription (description, price) {
    if(price === "none") {
        return (
            <div className="item-price-description">
                <p className="item-description">{description}:</p>
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

}

function DrinkSubSection(subheading, items) {
    const DrinkItemComponents = items
    .map(itemInfo =>
        ItemPriceDescription(itemInfo.description, itemInfo.price)
    )

    if(subheading === "none") {
        return (
            <div className="item-sub-description">
                {DrinkItemComponents}
                <style jsx>{`
                    .item-sub-description {
                        overflow: auto;
                    }
                `}</style>
            </div>
        )
    }
    return (
        <div className="item-sub-description">
            {ItemPriceDescription(subheading, "none")}
            {DrinkItemComponents}
            <style jsx>{`
                .item-sub-description {
                    overflow: auto;
                    margin-bottom: 2.5rem;
                }
            `}</style>
        </div>
    )

}

const DrinkItemInfo = props => {
    const ItemSubSectionComponents = props.itemInformation
    .map(itemInfo =>
        DrinkSubSection(itemInfo.subheading, itemInfo.items)
    )
    return (
        <div className="description-box">
            {ItemSubSectionComponents}
            <style jsx>{`
                .description-box {
                    border-radius: 0px 0px 10px 10px;
                    overflow: auto;
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
export default DrinkItemInfo
