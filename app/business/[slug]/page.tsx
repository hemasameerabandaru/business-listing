import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeleteButton from '@/app/components/DeleteButton';

async function getBusiness(slug: string) {
  try {
    // SSR Requirement: cache: 'no-store' ensures fresh data
    const res = await fetch(`http://localhost:3000/api/businesses/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const business = await getBusiness(slug);
  if (!business) return { title: 'Not Found' };
  
  return {
    title: `${business.name} | Business Directory`,
    description: business.description,
  };
}

export default async function BusinessDetail({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const business = await getBusiness(slug);
  if (!business) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    image: business.imageUrl,
    address: business.address,
    description: business.description,
  };

  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Back Link */}
      <div className="mb-6">
        <Link href="/" className="text-purple-600 font-bold hover:underline hover:text-purple-800 transition-colors">
          ← Back to Directory
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Image Section */}
        <div className="relative h-96 w-full">
           <Image 
             src={business.imageUrl} 
             alt={business.name} 
             fill 
             className="object-cover" 
             priority 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
           <div className="absolute bottom-6 left-8 text-white">
             <h1 className="text-5xl font-bold mb-2 drop-shadow-md">{business.name}</h1>
             <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-bold border border-white/30">
               {business.category}
             </span>
           </div>
        </div>

        <div className="p-8">
          {/* Description */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">About</h3>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed border-b border-gray-100 pb-8">
            {business.description}
          </p>
          
          {/* Address */}
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 mb-8 flex items-start gap-4">
             <div className="bg-purple-200 p-2 rounded-full text-purple-700">📍</div>
             <div>
               <h3 className="font-bold text-purple-900 mb-1">Location</h3>
               <p className="text-purple-800 font-medium">{business.address}</p>
             </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
             {/* EDIT BUTTON (Links to the new Edit Page) */}
             <Link 
               href={`/edit/${business.slug}`} 
               className="flex-1 text-center bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-md hover:-translate-y-1"
             >
               ✏️ Edit Business
             </Link>

             {/* DELETE BUTTON */}
             <div className="flex-1">
                <DeleteButton slug={business.slug} /> 
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}