import React from "react"

const Footer = () => {
    return (
        <div>
        <footer className="page-footer bg-dark text-white d-flex flex-wrap justify-content-center">

            <p className="text-white mr-3 my-2">© Track Town Pizza</p>
            <a href="#" className="text-white mr-3 my-2">Menu</a>
            <a href="#" className="text-white mr-3 my-2">Contact</a>
            <a href="#" className="text-white mr-3 my-2">Community</a>
            <a href="#" className="text-white mr-3 my-2">About</a>
            <a href="#" className="text-white mr-3 my-2">
                <i className="fab fa-facebook-square"></i>
            </a>

        </footer>

        <style jsx>{`
            footer {
                bottom: 0;
                position: absolute;
                width: 100%;
            }
        `}              
        </style>
        </div>
    )
}

export default Footer