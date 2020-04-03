import nextConnect from "next-connect"
import middleware from "../../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	let doc = await req.db.collection("prices").findOne({ "key": "prices" })
	res.json(doc)
})

export default handler
