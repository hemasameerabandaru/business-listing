import { NextResponse } from 'next/server';
import { businesses, updateBusinesses, Business } from '@/lib/data';
import { revalidatePath } from 'next/cache'; // <--- NEW IMPORT

export async function GET() {
  return NextResponse.json(businesses);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newBusiness: Business = {
    ...body,
    id: Date.now().toString(),
    slug: body.name.toLowerCase().replace(/ /g, '-'),
  };
  
  updateBusinesses([...businesses, newBusiness]);
  
  // <--- ADD THIS LINE: Instantly updates the homepage ISR cache
  revalidatePath('/'); 
  
  return NextResponse.json(newBusiness, { status: 201 });
}