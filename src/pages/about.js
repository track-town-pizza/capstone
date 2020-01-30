import Layout from "../components/Layout"
import Link from "next/link"

const About = () => {
    return (
        <Layout>
            <h1 className="text-center">About Track Town Pizza</h1>
            <div className="h-50 mx-auto">
                <img src="./photos/a1.JPG" className="img-fluid" alt="Track Town Pizza" />
            </div>
            <div className="mx-auto">
                <p>
                    Located on Franklin Boulevard across from the University of Oregon, Track Town Pizza opened its doors in 1977. The 100-seat restaurant is adorned with photos of the university and many collegiate and Olympic athletes. Many athletes, families, and students have enjoyed eating at the classic pizzeria. 
                </p>
                <p>
                    It is a favorite spot to grab lunch, have pizza night with the family, or watch the game and enjoy a brew with friends. Every pizza is made to order with handmade sauce, fresh produce, and dough and recipes made from scratch. Track Town Pizza’s wide variety of pizzas, 11 beers on draft, and well-stocked salad bar offer something for everyone.
                </p>
                <p>
                    Track Town’s location is ideal for grabbing a bite after U of O sporting events. It is a tradition for many to go after a U of O home football win or before a civil war basketball game. Track Town is right across the street from Matt Knight arena. It’s location couldn’t be more convenient for your Eugene outings. 
                </p>
                <p>
                    Besides making great food, Track Town Pizza supports the Eugene and Springfield community. Every year, thousands of dollars are raised through fundraising programs. Track Town believes in supporting their local community.
                </p>
            </div>
            <div>
                <h3 className="text-center">Checkout the rest of Track Town USA</h3>
                <Link href="./TrackTownUSAMap.pdf">
                    <a href="./TrackTownUSAMap.pdf" className="text-center">Track Town USA Map</a>
                </Link>
            </div>
        </Layout>
    )
}

export default About