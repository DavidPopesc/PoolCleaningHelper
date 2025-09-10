import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// GET: Retrieve pool data from cookie
export async function GET() {
  const cookieStore = await cookies();
  const poolData = cookieStore.get('PoolData')?.value;
  return NextResponse.json({ poolData: poolData ? JSON.parse(poolData) : null });
}

// POST: Store pool data in cookie
export async function POST(request: Request) {
  const { pool } = await request.json(); //
  const cookieStore = await cookies();
  const existing = cookieStore.get('PoolData')?.value;
  const pools = existing ? JSON.parse(existing) : [];
  pools.push(pool);
  const response = NextResponse.json({ success: true, pools });
  response.cookies.set('PoolData', JSON.stringify(pools), { path: '/' });
  return response;
}
