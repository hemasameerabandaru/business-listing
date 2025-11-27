'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const [formData, setFormData] = useState({
    name: '', 
    description: '', 
    category: 'Technology', 
    imageUrl: 'https://placehold.co/600x400', 
    address: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/businesses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-100 to-indigo-100">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-900">
          Register Your Business
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our premium directory today.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <div className="mt-1">
                <input 
                  type="text" 
                  required 
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="e.g. Royal Solutions"
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-purple-400 transition-colors bg-gray-50">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <div className="mt-1">
                <textarea 
                  rows={3}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Tell us about your services..."
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <div className="mt-1 space-y-3">
                <select 
                  className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                  value={isCustomCategory ? 'Other' : formData.category}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'Other') {
                      setIsCustomCategory(true);
                      setFormData({ ...formData, category: '' }); 
                    } else {
                      setIsCustomCategory(false);
                      setFormData({ ...formData, category: val });
                    }
                  }}
                >
                  <option value="Technology">Technology</option>
                  <option value="Food">Food</option>
                  <option value="Health">Health</option>
                  <option value="Travel">Travel</option>
                  <option value="Service">Service</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Education">Education</option>
                  <option value="Retail">Retail</option>
                  <option value="Other" className="font-bold text-purple-600">+ Add Custom Category</option>
                </select>
                {isCustomCategory && (
                  <input
                    type="text"
                    autoFocus
                    placeholder="Type your new category name..."
                    className="block w-full px-3 py-3 border border-purple-300 bg-purple-50 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all animate-pulse-once"
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <div className="mt-1">
                <input 
                  type="text" 
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="e.g. 123 Main St, Hyderabad"
                  onChange={e => setFormData({...formData, address: e.target.value})} 
                />
              </div>
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-gradient-to-r from-purple-800 to-indigo-600 hover:from-purple-900 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform transition hover:-translate-y-1 hover:shadow-xl"
              >
                Create Listing
              </button>
            </div>
            
            <div className="text-center mt-4">
                 <Link href="/" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                    ← Back to Home
                 </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}