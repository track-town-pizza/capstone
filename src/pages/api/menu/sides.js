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

handler.post(async (req, res) => {
	const { sides } = req.body

	for (let side of sides) {
		// Remove _id attributes to prevent attempts to update them in DB
		delete side["_id"]
		
		// Update document in DB
		try {
			await req.db.collection("sides").updateOne(
				{ key: side.key },
				{ $set: side },
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
