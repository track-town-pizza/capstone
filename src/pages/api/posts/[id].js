import nextConnect from "next-connect"
import { ObjectId } from "mongodb"
import middleware from "../../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	const { query: { id } } = req

	let doc = await req.db.collection("posts").findOne({ "_id": ObjectId(id) })

	res.json(doc)
})

export default handler
