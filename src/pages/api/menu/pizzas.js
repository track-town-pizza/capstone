import nextConnect from "next-connect"
import middleware from "../../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	// Set CORS headers in advance
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With")
	
	// Find all documents in the pizzas collection
	await req.db.collection("pizzas").find({}, (err, cursor) => {
		if (!err && cursor) {
			// Convert cursor to a documents array if found and no errors occur
			cursor.toArray((err, pizzas) => {
				if (!err && pizzas) {
					// Store pizzas as JSON in result body if cursor-to-array conversion is successful and no errors occur
					res.json(JSON.stringify(pizzas))
				} else {
					console.log("== Error: either no pizzas were found or an error occurred while converting the cursor to an array")
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
	const { pizzas } = req.body

	// Set CORS headers in advance
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With")

	for (let pizza of pizzas) {
		// Remove _id attributes to prevent attempts to update them in DB
		delete pizza["_id"]

		// Update document in DB
		try {
			await req.db.collection("pizzas").updateOne(
				{ key: pizza.key },
				{ $set: pizza },
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
