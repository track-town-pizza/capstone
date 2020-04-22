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
	const { merchandise } = req.body

	for (let merch of merchandise) {
		// Remove _id attributes to prevent attempts to update them in DB
		delete merch["_id"]

		// Update document in DB
		try {
			await req.db.collection("merchandise").updateOne(
				{ key: merch.key },
				{ $set: merch },
				{ upsert: true }
			)
		} catch (err) {
			// An error occurred, exit API
			res.status(500).json({ err })
			return
		}
	}

	// If the for loop completes without returning, then no
	// errors occurred while updating all of the documents.
	res.status(200).json({ message: "OK" })
})

export default handler
