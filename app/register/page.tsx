'use client';
import React, { useState } from 'react';
const Link = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => (
  <a href={href} className={className}>{children}</a>
);
const Image = ({ src, alt, fill, className }: { src: string, alt: string, fill?: boolean, className?: string }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className}
    style={fill ? { position: 'absolute', height: '100%', width: '100%', inset: 0, objectFit: 'cover' } : {}} 
  />
);

export default function Register() {
  const router = {
    push: (path: string) => window.location.href = path,
    refresh: () => window.location.reload()
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', 
    description: '', 
    category: 'Technology', 
    imageUrl: '', 
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
    setIsSubmitting(true); 
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Form Submitted", formData);
    setIsSubmitting(false);
    alert("Business Registered! (Simulation)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-900 drop-shadow-sm">
          Register Your Business
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our premium directory today.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/50 backdrop-blur-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-gray-700">Business Name</label>
              <div className="mt-1">
                <input 
                  type="text" 
                  required 
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300"
                  placeholder="e.g. Royal Solutions"
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Brand Image</label>
              {formData.imageUrl ? (
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden border-2 border-purple-200 shadow-md group">
                  <Image 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-bold">✓ Image Loaded</p>
                  </div>
                </div>
              ) : null}

              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer group">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-purple-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-bold text-purple-600 hover:text-purple-500 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Description</label>
              <div className="mt-1">
                <textarea 
                  rows={3}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300"
                  placeholder="Tell us about your services..."
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Category</label>
              <div className="mt-1">
                <select 
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white cursor-pointer hover:border-purple-300"
                  onChange={e => setFormData({...formData, category: e.target.value})}
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
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300"
                  placeholder="e.g. 123 Main St, Hyderabad"
                  onChange={e => setFormData({...formData, address: e.target.value})} 
                />
              </div>
            </div>
            <div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white transition-all transform duration-200
                  ${isSubmitting 
                    ? 'bg-purple-400 cursor-not-allowed scale-100' 
                    : 'bg-gradient-to-r from-purple-800 to-indigo-600 hover:from-purple-900 hover:to-indigo-700 hover:-translate-y-1 hover:shadow-xl active:scale-95 cursor-pointer'
                  }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Listing...
                  </span>
                ) : (
                  "Create Listing"
                )}
              </button>
            </div>
            
            <div className="text-center mt-4">
                 <Link href="/" className="text-sm text-purple-600 hover:text-purple-800 font-bold hover:underline transition-all">
                    ← Back to Home
                 </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}