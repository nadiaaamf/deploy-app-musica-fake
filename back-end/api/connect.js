import { MongoClient } from "mongodb";


const URI = "mongodb+srv://nadiamfaria:TOHJy93hHLh7hyHL@cluster0.e3alubq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(URI);

export const db = client.db("spotifyTest");
// const songCollection = await db.collection('songs').find({}).toArray();