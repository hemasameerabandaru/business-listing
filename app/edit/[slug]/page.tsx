'use client';

import React, { useState, useEffect } from 'react';
const useRouter = () => ({
  push: (path: string) => window.location.href = path,
  back: () => window.history.back(),
  refresh: () => window.location.reload()
});

export default function EditBusiness({ params }: { params?: Promise<{ slug: string }> | { slug: string } }) {
  const [slug, setSlug] = useState<string>('');
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', description: '', category: '', imageUrl: '', address: ''
  });

  useEffect(() => {
    const resolveParams = async () => {
      let currentSlug = 'demo-slug';

      if (params) {
        if ('then' in params) {
          const unwrapped = await params;
          currentSlug = unwrapped.slug;
        } else {
          currentSlug = params.slug;
        }
      }
      
      setSlug(currentSlug);
      console.log("Fetching data for:", currentSlug);
      setTimeout(() => {
        setFormData({
            name: 'Tech Sol', 
            description: 'Top tier IT solutions and software development.', 
            category: 'Technology', 
            imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', 
            address: '123 Tech Park, India'
        });
        setLoading(false);
      }, 500);
    };

    resolveParams();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800)); 
    console.log("Updated Data:", formData);
    alert("Business Updated Successfully! (Simulation)");
    setIsSubmitting(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-purple-900 font-bold animate-pulse">
      Loading business details...
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-900">
          Edit Business
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Update the details below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/50 backdrop-blur-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-gray-700">Business Name</label>
              <div className="mt-1">
                <input 
                  value={formData.name}
                  disabled
                  className="block w-full px-4 py-3 border border-gray-200 bg-gray-100 rounded-xl text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1">Name cannot be changed.</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Description</label>
              <div className="mt-1">
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Category</label>
              <div className="mt-1">
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white cursor-pointer hover:border-purple-300"
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
            <div>
              <label className="block text-sm font-bold text-gray-700">Address</label>
              <div className="mt-1">
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => router.back()}
                disabled={isSubmitting}
                className="w-1/3 flex justify-center py-4 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all active:scale-95"
              >
                Cancel
              </button>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-2/3 flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white transition-all transform duration-200
                  ${isSubmitting 
                    ? 'bg-purple-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-800 to-indigo-600 hover:from-purple-900 hover:to-indigo-700 hover:-translate-y-1 hover:shadow-xl active:scale-95'
                  }`}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}