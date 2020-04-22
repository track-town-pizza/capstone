import nextConnect from "next-connect"
import middleware from "../../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	let doc = await req.db.collection("prices").findOne({ "key": "prices" })
	res.json(doc)
})

handler.post(async (req, res) => {
	const { prices } = req.body

	// Remove _id attribute to prevent attempts to update it in DB
	delete prices["_id"]

	console.log("== New Prices (Server Side):", prices)

	try {
		await req.db.collection("prices").updateOne(
			{ key: "prices" },
			{ $set: prices },
			{ upsert: true }
		)
		res.status(200).json({ message: "OK" })
	} catch (err) {
		// Return error with 500 status code if update fails
		res.status(500).json({ err })
	}
})

export default handler
