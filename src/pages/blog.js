import Link from "next/link"
import Layout from "../components/Layout"
import postData from "../../PostData.json"
// import SinglePost from "../components/SinglePost"

const postRenderLimit = 3;

const Blog = props => (
	<Layout>
		{postData.posts.map(post => (
			<div key={post.id}>
				<h3>
					<Link href="/post/[id]" as={`/post/${post.id}`}>
						<a>{post.title}</a>
					</Link>
				</h3>
				<small>{post.date}</small>
				<img src={post.imageLink} className="mw-100" />
				<p>{post.content}</p>
			</div>
		))}
        {/* <SinglePost post={PostData.posts[0]} />
        <SinglePost post={PostData.posts[1]} />
        <SinglePost post={PostData.posts[2]} /> */}
	</Layout>
)

export default Blog
