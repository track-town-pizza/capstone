import { useRouter } from "next/router"
import Layout from "../../../components/Layout"
import postData from "../../../../data/PostData.json" // will be removed with backend implementation
import SinglePost from "../../../components/SinglePost.js"

const Post = () => {
	const router = useRouter()

    // !!!WARNING!!!
    // Data fetching is currently reliant on the fact that post id's match with array positions.
    // Will have to fetch based on key when using MongoDB

    if (postData.posts[router.query.id] != undefined) {
        const postNum = router.query.id
        return (
            <Layout>
                <SinglePost post={postData.posts[postNum]} key={postNum}/>
            </Layout>
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
