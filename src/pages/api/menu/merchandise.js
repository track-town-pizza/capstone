import nextConnect from "next-connect"
import middleware from "../../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	// Find all documents in the merchandise collection
	await req.db.collection("merchandise").find({}, (err, cursor) => {
		if (!err && cursor) {
			// Convert cursor to a documents array if found and no errors occur
			cursor.toArray((err, merchandise) => {
				if (!err && merchandise) {
					// Store merchandise as JSON in result body if cursor-to-array conversion is successful and no errors occur
					res.json(JSON.stringify(merchandise))
				} else {
					console.log("== Error: either no merchandise were found or an error occurred while converting the cursor to an array")
				}
			})
		} else {
			console.log("== Error: either no cursor found or an error occurred while performing the query")
		}
	})
})

export default handler
