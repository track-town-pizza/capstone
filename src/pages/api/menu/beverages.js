import nextConnect from "next-connect"
import middleware from "../../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	// Find all documents in the beverages collection
	await req.db.collection("beverages").find({}, (err, cursor) => {
		if (!err && cursor) {
			// Convert cursor to a documents array if found and no errors occur
			cursor.toArray((err, beverages) => {
				if (!err && beverages) {
					// Store beverages as JSON in result body if cursor-to-array conversion is successful and no errors occur
					res.json(JSON.stringify(beverages))
				} else {
					console.log("== Error: either no beverages were found or an error occurred while converting the cursor to an array")
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
