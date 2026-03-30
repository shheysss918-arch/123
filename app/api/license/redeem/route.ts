import { NextResponse } from 'next/server';
import { connect_to_db } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { username, key } = await req.json();
    if (!username || !key) return NextResponse.json({ error: 'invalid_request' }, { status: 400 });

    const db = await connect_to_db();
    
    // 1. Verify and Burn License
    const license = await db.collection('licenses').findOne({ key, used: false });
    if (!license) return NextResponse.json({ error: 'invalid_key' }, { status: 401 });

    const user = await db.collection('users').findOne({ username });
    if (!user) return NextResponse.json({ error: 'user_not_found' }, { status: 404 });

    // 2. Grant Entitlement
    const ms_to_add = parseInt(license.days) * 86400000;
    const current_sub = await db.collection('subscriptions').findOne({ uid: user._id.toString(), plan: license.product });
    
    const new_end = Math.max(current_sub?.end_date || Date.now(), Date.now()) + ms_to_add;

    await db.collection('subscriptions').updateOne(
      { uid: user._id.toString(), plan: license.product },
      { $set: { end_date: new_end, last_updated: Date.now() } },
      { upsert: true }
    );

    // 3. Mark Key as Used
    await db.collection('licenses').updateOne({ _id: license._id }, { $set: { used: true, used_by: username, used_at: Date.now() } });

    console.log('license_burn'.padEnd(16) + ` [ ${username} | ${license.product} ] | [+]`);
    return NextResponse.json({ status: 'ok', product: license.product, end_date: new_end });

  } catch (e) {
    return NextResponse.json({ error: 'internal_failure' }, { status: 500 });
  }
}
