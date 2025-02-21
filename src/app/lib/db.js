import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
// just in case
if (!uri) {
  throw new Error("uri not given");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;

export async function connToDaDB() {
  const client = await clientPromise;
  return client.db(); // returns the default database instance
}
