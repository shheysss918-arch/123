import { NextResponse } from 'next/server';
import { connect_to_db } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await connect_to_db();
    const products = await db.collection('products').find({}).toArray();
    return NextResponse.json(products);
  } catch (e) {
    return NextResponse.json({ error: 'internal_failure' }, { status: 500 });
  }
}
