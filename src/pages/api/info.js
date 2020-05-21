import nextConnect from "next-connect"
import middleware from "../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	const info = await req.db.collection("info").findOne({ "key": "info" })
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.json(info)
})

handler.post(async (req, res) => {
	const { info } = req.body

	// Remove _id attribute to prevent attempts to update it in DB
	delete info["_id"]
	
	try {
		await req.db.collection("info").updateOne(
			{ key: "info" },
			{ $set: info },
			{ upsert: true }		// PUTs if document found, POSTs otherwise
		)
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		res.status(200).json({ message: "OK" })
	} catch (err) {
		// Return error with 500 status code if update fails
		res.status(500).json({ err })
	}
})

export default handler
