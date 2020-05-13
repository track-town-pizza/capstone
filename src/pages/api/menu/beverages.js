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

handler.post(async (req, res) => {
	const { beverages } = req.body

	for (let beverage of beverages) {
		// Remove _id attributes to prevent attempts to update them in DB
		delete beverage["_id"]

		// Update document in DB
		try {
			await req.db.collection("beverages").updateOne(
				{ key: beverage.key },
				{ $set: beverage },
				{ upsert: true }
			)
		} catch (err) {
			// An error occurred, exit API
			res.status(500).json({ err })
		}
	}

	// If the for loop completes without returning, then no
	// errors occurred while updating all of the documents.
	res.status(200).json({ message: "OK" })
})

export default handler
