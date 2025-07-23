import { NextResponse } from 'next/server'
import { getClubs } from '@/app/actions/feed'

export async function GET() {
  try {
    const result = await getClubs()
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 })
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Clubs API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
