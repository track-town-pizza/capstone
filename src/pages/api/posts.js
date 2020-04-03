import nextConnect from "next-connect"
import { ObjectId } from "mongodb"
import middleware from "../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	// Find all documents in the blog posts collection
	await req.db.collection("posts").find({}, (err, cursor) => {
		if (!err && cursor) {
			// Convert cursor to a documents array if found and no errors occur
			cursor.toArray((err, posts) => {
				if (!err && posts) {
					// Store blog posts as JSON in result body if cursor-to-array conversion is successful and no errors occur
					res.json(JSON.stringify(posts))
				} else {
					console.log("== Error: either no blog posts were found or an error occurred while converting the cursor to an array")
				}
			})
		} else {
			console.log("== Error: either no cursor found or an error occurred while performing the query")
		}
	})
})

handler.post(async (req, res) => {
	const { postId } = req.body
	let doc = await req.db.collection("info").findOne({ "_id": ObjectId(postId) })
	console.log("== Requested doc:", doc)
	res.json(doc)
})

export default handler
