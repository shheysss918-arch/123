import { NextResponse } from 'next/server';
import { connect_to_db } from '@/lib/mongodb';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { product, days, amount } = await req.json();
    if (!product || !days || !amount) return NextResponse.json({ error: 'invalid_request' }, { status: 400 });

    const db = await connect_to_db();
    const generated_keys = [];

    for (let i = 0; i < amount; i++) {
      const key = crypto.randomBytes(10).toString('hex').toUpperCase().match(/.{1,5}/g)?.join('-') || 'ERR-KEY';
      const license = {
        key,
        product,
        days: parseInt(days),
        used: false,
        created_at: Date.now(),
        creator: 'ADMIN_TERMINAL'
      };
      await db.collection('licenses').insertOne(license);
      generated_keys.push(key);
    }

    console.log('keys_forged'.padEnd(16) + ` [ ${amount} | ${product} ] | [+]`);
    return NextResponse.json({ status: 'ok', keys: generated_keys });

  } catch (e) {
    return NextResponse.json({ error: 'internal_failure' }, { status: 500 });
  }
}
