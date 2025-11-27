'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Business } from '@/lib/data';

const ITEMS_PER_PAGE = 6;

export default function ClientList({ initialBusinesses }: { initialBusinesses: Business[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const filtered = initialBusinesses.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === '' || b.category === category)
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-10">
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="🔍 Search businesses..." 
            className="flex-1 p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
            onChange={handleSearch} 
          />
          <select 
            className="p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-gray-700 cursor-pointer"
            onChange={handleCategory}
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Food">Food</option>
            <option value="Health">Health</option>
            <option value="Travel">Travel</option>
            <option value="Service">Service</option>
            <option value="Education">Education</option>
            <option value="Automotive">Automotive</option>
            <option value="Retail">Retail</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {currentData.map((b) => (
          <Link key={b.id} href={`/business/${b.slug}`} className="group h-full">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col h-full">
              
              <div className="relative h-56 w-full overflow-hidden">
                 <Image 
                   src={b.imageUrl} 
                   alt={b.name} 
                   fill 
                   className="object-cover group-hover:scale-110 transition-transform duration-500" 
                 />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-800 shadow-sm uppercase tracking-wider">
                   {b.category}
                 </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                   <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                     {b.name}
                   </h2>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                  {b.description}
                </p>
                
                <div className="pt-4 border-t border-gray-100 flex items-center text-gray-400 text-xs font-medium">
                  <span className="mr-2">📍</span> 
                  <span className="truncate">{b.address}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">No businesses found matching your criteria.</p>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pb-10">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-6 py-2 rounded-full font-bold transition-all shadow-md ${
              currentPage === 1 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-purple-700 hover:bg-purple-50 border border-purple-200'
            }`}
          >
            ← Previous
          </button>
          
          <span className="text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-6 py-2 rounded-full font-bold transition-all shadow-md ${
              currentPage === totalPages 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}