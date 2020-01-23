import Link from "next/link"
import Layout from "../components/Layout"
import postData from "../../PostData"

const Blog = props => (
	<Layout>
		{postData.Posts.map(post => (
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
	</Layout>
)

export default Blog
