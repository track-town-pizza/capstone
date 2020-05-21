import nextConnect from "next-connect"
import middleware from "../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	// Set CORS headers in advance
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With")
	
	let doc = await req.db.collection("about").findOne({ "key": "about" })
	res.json(doc)
})

export default handler
