import React from "react"
import Link from "next/link"

const MenuCategory = props => (
    <div className="outer-menu-element">
        <Link href={props.menuInfo.linkToPage}>
            <a>
                <div className="menu-item">
                    <img src={props.menuInfo.imgLink} aria-hidden="true" alt={props.menuInfo.altText} />
                    <div className="green-box">
                        <p className="menu-text p-2 m-0 text-center">{props.menuInfo.item}</p>
                    </div>
                </div>
            </a>
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
            @supports (-ms-ime-align: auto) {
                .menu-text {
                    font-weight: bold;
                    font-size: 18px;
                }
              }
        `}
        </style>
    </div>
)
export default MenuCategory