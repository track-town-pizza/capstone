import Layout from "../components/Layout"
import PostData from "./PostData.json"
import SinglePost from "../components/SinglePost"

const postRenderLimit = 3;

const Index = () => (
	<Layout>
        <SinglePost post={PostData.posts[0]} />
        <SinglePost post={PostData.posts[1]} />
        <SinglePost post={PostData.posts[2]} />
	</Layout>
)

export default Index
