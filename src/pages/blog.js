import Link from "next/link"
import Layout from "../components/Layout"
import postData from "../../data/PostData.json" // will be removed with backend implementation
import SinglePost from "../components/SinglePost"

const postRenderLimit = 3;

const Blog = props => (
	<Layout>
		{postData.posts.map(post => (
            <SinglePost post={post} key={post.id}/>
		))}
	</Layout>
)

export default Blog
