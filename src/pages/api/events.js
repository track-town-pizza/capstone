import nextConnect from "next-connect"
import middleware from "../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	// Find all documents in the beverages collection
	await req.db.collection("events").find({}, (err, cursor) => {
		if (!err && cursor) {
			// Convert cursor to a documents array if found and no errors occur
			cursor.toArray((err, events) => {
				if (!err && events) {
					// Store events as JSON in result body if cursor-to-array conversion is successful and no errors occur
					res.json(JSON.stringify(events))
				} else {
					console.log("== Error: either no events were found or an error occurred while converting the cursor to an array")
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
	const { events } = req.body

	// Remove _id attribute to prevent attempts to update it in DB
	for (let event of events) {
		delete event["_id"]
	}

	try {
		await req.db.collection("events").updateMany({ }, { events }, { upsert: true })
		res.status(201).json({ message: "OK" })
	} catch (err) {
		res.status(500).json({ err })
	}
})

export default handler
