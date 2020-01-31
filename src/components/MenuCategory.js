import React from "react"

const MenuCategory = props => (
    <a href="#" className="menu-item">
        <img src={props.menuInfo.imgLink} alt="Track Town Pizza" />
        <div className="green-box">
            <p className="p-2 m-0 text-center">{props.menuInfo.item}</p>
        </div>
        <style jsx>{`
            .menu-item {
                position: relative;
                min-width: 200px;
                width: 25%;
                margin-bottom:5%;
                margin-right: 2.5%;
                margin-left: 2.5%;
            }
            img {
                width: 100%;
                border-radius: 10px;
            }
            .green-box {
                position: absolute;
                bottom: 0px;
                background: rgb(0, 112, 48, 0.8);
                width: 55%;
                color: #FFFFFF;
                border-radius: 10px;
            }
        `}
        </style>
    </a>
)
export default MenuCategory