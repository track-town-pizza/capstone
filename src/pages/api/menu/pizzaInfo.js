import nextConnect from "next-connect"
import middleware from "../../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	let doc = await req.db.collection("pizzaInfo").findOne({ "key": "pizza_info" })
	res.json(doc)
})

export default handler
