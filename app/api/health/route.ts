import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const cookies = request.cookies.getAll()
  return NextResponse.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    cookies,
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_key_exists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  })
}
