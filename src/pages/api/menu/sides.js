import nextConnect from "next-connect"
import middleware from "../../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	// Find all documents in the sides collection
	await req.db.collection("sides").find({}, (err, cursor) => {
		if (!err && cursor) {
			// Convert cursor to a documents array if found and no errors occur
			cursor.toArray((err, sides) => {
				if (!err && sides) {
					// Store sides as JSON in result body if cursor-to-array conversion is successful and no errors occur
					res.json(JSON.stringify(sides))
				} else {
					console.log("== Error: either no sides were found or an error occurred while converting the cursor to an array")
					res.status(500).json({ err })
				}
			})
		} else {
			console.log("== Error: either no cursor found or an error occurred while performing the query")
			res.status(500).json({ err })
		}
	})
})

export default handler
