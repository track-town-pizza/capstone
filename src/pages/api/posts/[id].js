import nextConnect from "next-connect"
import { ObjectId } from "mongodb"
import middleware from "../../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	const { query: { id } } = req

	console.log("== Post ID on Server Side:", id)

	let doc = await req.db.collection("posts").findOne({ "_id": ObjectId(id) })

	console.log("== Post on Server Side:", doc)

	res.json(doc)
})

export default handler
