import "dotenv/config.js";
import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const dbURI = `mongodb://127.0.0.1:27017`;
    const dbURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@bram-test-mongodb.koftlqn.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(dbURI);
    await client.connect();
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
