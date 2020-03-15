import Link from "next/link"

const Footer = () => (
    <div>
        <footer className="page-footer bg-dark text-white d-flex flex-wrap justify-content-center">

            <p className="text-white mr-3 my-2">© Track Town Pizza</p>

            <Link href="/menu">
                <a className="text-white mr-3 my-2">Menu</a>
            </Link>

            <Link href="/contact">
                <a className="text-white mr-3 my-2">Contact</a>
            </Link>

            <Link href="/events">
                <a className="text-white mr-3 my-2">Events</a>
            </Link>

            <Link href="/blog">
                <a className="text-white mr-3 my-2">Blog</a>
            </Link>

            <Link href="/about">
                <a className="text-white mr-3 my-2">About</a>
            </Link>

            <Link href="https://www.facebook.com/TrackTownPizza/">
                <a className="text-white mr-3 my-2">
                    <i className="fab fa-facebook-square"></i>
                </a>
            </Link>

        </footer>

        <style jsx>{`
            footer {
                bottom: 0;
                width: 100%;
            }
        `}
        </style>
    </div>
)

export default Footer
