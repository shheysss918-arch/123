import { NextResponse } from 'next/server';
import { connect_to_db } from '@/lib/mongodb';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) return NextResponse.json({ error: 'invalid_request' }, { status: 400 });

    const db = await connect_to_db();
    
    // 1. Verify Administrative Credentials
    const admin = await db.collection('admins').findOne({ username, password });
    if (!admin) return NextResponse.json({ error: 'invalid_identity' }, { status: 401 });

    // 2. Forge Session Cookie (Disconnected Backend Logic)
    const cookie_store = await cookies();
    cookie_store.set('admin_session', 'NOMINAL_IDENTIFIED_OPERATOR', {
      httpOnly: true,
      secure: process.env.NODE_NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 * 12, // 12 hours
      path: '/'
    });

    console.log('admin_session'.padEnd(16) + ` [ ${username} ] | [+]`);
    return NextResponse.json({ status: 'ok', operator: username });

  } catch (e) {
    return NextResponse.json({ error: 'internal_failure' }, { status: 500 });
  }
}
