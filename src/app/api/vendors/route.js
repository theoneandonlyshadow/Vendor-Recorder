import { connToDaDB } from '../../lib/db';
import { ObjectId } from 'mongodb';
const secret = process.env.NEXTAUTH_SECRET;
import { getToken } from "next-auth/jwt";
export async function GET() {
  const db = await connToDaDB(); // database instance
  const vendors = await db.collection('vendors').find().toArray();
  return Response.json(vendors);
}

export async function POST(req) {
  const token = await getToken({ req, secret });
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  
  const db = await connToDaDB();
  const { vendorName, bankAccountNo, bankName, address, city, country, zipCode } = await req.json();

  // push the details
  const result = await db.collection('vendors').insertOne({
    vendorName,
    bankAccountNo,
    bankName,
    address,
    city,
    country,
    zipCode,
  });

  return Response.json({ message: 'vendor created', id: result.insertedId });
}
export async function PUT(req) {
  const db = await connToDaDB();
  const { _id, vendorName, bankAccountNo, bankName, address, city, country, zipCode } = await req.json();

  await db.collection('vendors').updateOne(
    { _id: new ObjectId(_id) },
    { $set: { vendorName, bankAccountNo, bankName, address, city, country, zipCode } }
  );

  return Response.json({ message: 'Vendor updated' });
}

export async function DELETE(req) {
  const db = await connToDaDB();
  const { _id } = await req.json();

  await db.collection('vendors').deleteOne({ _id: new ObjectId(_id) });

  return Response.json({ message: 'Vendor deleted' });
}
