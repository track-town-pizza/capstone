import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import postData from "../../../data/PostData.json" // will be removed with backend implementation
import SinglePost from "../../components/SinglePost.js"

const Post = () => {
	const router = useRouter()

    // !!!WARNING!!!
    // Data fetching is currently reliant on the fact that post id's match with array positions.
    // Will have to fetch based on date when using MongoDB

    if (postData.posts[router.query.id] != undefined) {
        const postNum = router.query.id
        return (
            <div>
                <Layout>
                    <div className="blog-container">
                        <SinglePost post={postData.posts[postNum]} key={postNum}/>
                    </div>
                </Layout>

                <style jsx>{`
                    .blog-container {
                        margin-left: 15%;
                        margin-right: 15%;
                        width: 70%;
                    }

                    @media only screen and (max-width: 700px) {
                        .blog-container {
                            margin-left: 10%;
                            margin-right: 10%;
                            width: 80%;
                        }
                    }
                `}</style>
            </div>
        )
    } else {
        return (
            <Layout>
                <p>Could not display post :(</p>
            </Layout>
        )
    }
}

export default Post
