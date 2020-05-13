import nextConnect from "next-connect"
import { ObjectId } from "mongodb"
import middleware from "../../../utils/database"

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	const { id } = req.query

	if (ObjectId.isValid(id)) {
		let doc = await req.db.collection("posts").findOne({ _id: ObjectId(id) })
		res.json(doc)
	} else {
		res.status(400).json({
			err: "The given ID is invalid."
		})
	}
})

handler.post(async (req, res) => {
	const { post } = req.body

	try {
		const res = await req.db.collection("posts").insertOne(post).then(_ => _.json())
		res.status(201).json({
			message: "OK",
			insertedId: res.insertedId
		})
	} catch (err) {
		// Return error with 500 status code if insertion fails
		res.status(500).json({ err })
	}
})

handler.put(async (req, res) => {
	const { post } = req.body

	// Remove _id attribute to prevent attempts to update it in DB
	delete post["_id"]

	try {
		await req.db.collection("posts").updateOne(
			{ id: post.id },
			{ $set: post },
			{ upsert: true }
		)
		res.status(200).json({ message: "OK" })
	} catch (err) {
		// Return error with 500 status code if update fails
		res.status(500).json({ err })
	}
})

export default handler
