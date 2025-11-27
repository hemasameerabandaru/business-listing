'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    // 1. ASK FOR CONFIRMATION
    const confirmed = window.confirm('Are you sure you want to delete this business?');
    
    // If they say "Cancel", stop here.
    if (!confirmed) return;

    // 2. DELETE DATA
    await fetch(`/api/businesses/${slug}`, {
      method: 'DELETE',
    });

    // 3. REDIRECT TO HOME
    router.push('/');
    router.refresh(); 
  };

  return (
    <button 
      onClick={handleDelete}
      className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Delete Business
    </button>
  );
}