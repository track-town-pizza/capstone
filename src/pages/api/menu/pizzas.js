import nextConnect from "next-connect"
import middleware from "../../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
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
				}
			})
		} else {
			console.log("== Error: either no cursor found or an error occurred while performing the query")
		}
	})
})

export default handler
