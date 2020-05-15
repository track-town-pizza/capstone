import nextConnect from "next-connect"
import middleware from "../../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	let doc = await req.db.collection("buffet").findOne({ "key": "Buffet Prices" })
	res.json(doc)
})

handler.post(async (req, res) => {
	const { buffet } = req.body
	
	// Remove _id attribute to prevent attempts to update it in DB
	delete buffet["_id"]

	try {
		await req.db.collection("buffet").update(
			{ key: "Buffet Prices" },
			{ $set: buffet },
			{ upsert: true }
		)
		res.status(200).json({ message: "OK" })
	} catch (err) {
		// Return error with 500 status code if update fails
		console.log("== Error:", err)
		res.status(500).json({ err })
	}
})

export default handler
