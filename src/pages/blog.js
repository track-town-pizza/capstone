import Link from "next/link"
import Layout from "../components/Layout"
import postData from "../../data/PostData.json" // will be removed with backend implementation
import SinglePost from "../components/SinglePost"

const postRenderLimit = 3;

/*
function getPostSet(pageNumber) {
    postSet = []

}
*/

const Blog = props => (

    /*
    const [blogState, setBlog] = useState({
        page: 0,


    })
    */


	<Layout>
		{postData.posts.map(post => (
            <SinglePost post={post} key={post.id}/>
		))}
	</Layout>
)

export default Blog
