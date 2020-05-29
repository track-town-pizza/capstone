import nextConnect from "next-connect"
import { ObjectId } from "mongodb"
import middleware from "../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	// Set CORS headers in advance
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With")

	// Find all documents in the blog posts collection
	await req.db.collection("posts").find({}, (err, cursor) => {
		if (!err && cursor) {
			// Convert cursor to a documents array if found and no errors occur
			cursor.toArray((err, posts) => {
				if (!err && posts) {
					// Store sorted blog posts as JSON in result body if cursor-to-array conversion is successful and no errors occur
					res.json(JSON.stringify(posts.sort((a, b) => (new Date(b.date) - new Date(a.date)))))
				} else {
					console.log("== Error: either no blog posts were found or an error occurred while converting the cursor to an array")
					res.status(500).json({ err })
				}
			})
		} else {
			console.log("== Error: either no cursor found or an error occurred while performing the query")
			res.status(500).json({ err })
		}
	})
})

handler.post(async (req, res) => {
	const { post } = req.body

	// Set CORS headers in advance
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With")

	try {
		let doc = await req.db.collection("posts").insertOne(post)
		res.status(201).json({
			message: "OK",
			insertedId: doc.insertedId
		})
	} catch (err) {
		// Return error with 500 status code if insertion fails
		res.status(500).json({ err })
	}
})

handler.delete(async (req, res) => {
	const { postId } = req.body
	
	// Set CORS headers in advance
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With")

	try {
		await req.db.collection("posts").deleteOne({ _id: ObjectId(postId) })
		res.status(200).json({ message: "OK" })
	} catch (err) {
		// Return error with 500 status code if insertion fails
		res.status(500).json({ err })
	}
})

export default handler
