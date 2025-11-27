import { NextResponse } from 'next/server';
import { businesses, updateBusinesses } from '@/lib/data';
import { revalidatePath } from 'next/cache'; // <--- NEW IMPORT

// GET: Get specific business
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const business = businesses.find((b) => b.slug === slug);
  if (!business) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(business);
}

// PUT: Update business
export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const body = await request.json();
  const index = businesses.findIndex((b) => b.slug === slug);
  
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const updated = { ...businesses[index], ...body };
  const newStore = [...businesses];
  newStore[index] = updated;
  updateBusinesses(newStore);

  revalidatePath('/'); // <--- Updates Homepage List
  revalidatePath(`/business/${slug}`); // <--- Updates Detail Page
  
  return NextResponse.json(updated);
}

// DELETE: Remove business
export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const newStore = businesses.filter((b) => b.slug !== slug);
  updateBusinesses(newStore);
  
  revalidatePath('/'); // <--- Updates Homepage List
  
  return NextResponse.json({ success: true });
}