import { useRouter } from "next/router"
import Layout from "../../components/Layout"

const Post = () => {
	const router = useRouter()

	return (
		<Layout>
			<p>Post</p>
		</Layout>
	)
}

export default Post