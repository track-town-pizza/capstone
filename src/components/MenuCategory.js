import React from "react"
import Link from "next/link"

const MenuCategory = props => (
    <div className="outer-menu-element">
        <Link href={props.menuInfo.linkToPage}>
            <div className="menu-item">
                <a>
                    <img src={props.menuInfo.imgLink} alt="Track Town Pizza" />
                    <div className="green-box">
                        <p className="p-2 m-0 text-center">{props.menuInfo.item}</p>
                    </div>
                </a>
            </div>
        </Link>
        <style jsx>{`
            .outer-menu-element {
                min-width: 200px;
                width: 25%;
                margin-bottom:5%;
                margin-right: 2.5%;
                margin-left: 2.5%;
            }
            .outer-menu-element:hover {
                cursor: pointer;
            }
            .menu-item {
                position: relative;
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
    </div>
)
export default MenuCategory