import Link from 'next/link';
import ClientList from './components/ClientList';

// ISR Requirement: Revalidate every 60 seconds
export const revalidate = 60;

async function getBusinesses() {
  try {
    const res = await fetch('http://localhost:3000/api/businesses', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}
export default async function Home() {
  const businesses = await getBusinesses();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-400 text-white py-20 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-md">
              Discover Great Businesses
            </h1>
            <p className="text-indigo-100 text-lg md:text-xl max-w-xl font-medium">
              Explore top-rated services, food, and tech hubs in your area. 
              Curated just for you.
            </p>
          </div>
          <Link 
            href="/register" 
            className="bg-white text-purple-900 font-bold px-8 py-4 rounded-full shadow-xl hover:bg-indigo-50 hover:scale-105 transition-all duration-300"
          >
            + Add Your Business
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10 pb-20">
        <ClientList initialBusinesses={businesses} />
      </div>
    </main>
  );
}