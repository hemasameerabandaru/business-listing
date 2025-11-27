'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function EditBusiness({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Unwrap the params to get the slug
  const resolvedParams = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', description: '', category: '', imageUrl: '', address: ''
  });

  // 2. Fetch the EXISTING data when the page loads
  useEffect(() => {
    fetch(`/api/businesses/${resolvedParams.slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Business not found');
          router.push('/');
        } else {
          setFormData(data);
          setLoading(false);
        }
      });
  }, [resolvedParams.slug, router]);

  // 3. Handle the Update (PUT Request)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/businesses/${resolvedParams.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    // Redirect back to the details page
    router.push(`/business/${resolvedParams.slug}`); 
    router.refresh();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-purple-900 font-bold">
      Loading business details...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-100 to-indigo-100">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-900">
          Edit Business
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Update the details below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Name (Read-Only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <div className="mt-1">
                <input 
                  value={formData.name}
                  disabled
                  className="block w-full px-3 py-3 border border-gray-200 bg-gray-100 rounded-xl text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1">Name cannot be changed to prevent broken links.</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <div className="mt-1">
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <div className="mt-1">
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="Technology">Technology</option>
                  <option value="Food">Food</option>
                  <option value="Health">Health</option>
                  <option value="Travel">Travel</option>
                  <option value="Service">Service</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Education">Education</option>
                  <option value="Retail">Retail</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <div className="mt-1">
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => router.back()}
                className="w-1/3 flex justify-center py-4 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all"
              >
                Cancel
              </button>
              
              <button 
                type="submit" 
                className="w-2/3 flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-gradient-to-r from-purple-800 to-indigo-600 hover:from-purple-900 hover:to-indigo-700 focus:outline-none transform transition hover:-translate-y-1 hover:shadow-xl"
              >
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}