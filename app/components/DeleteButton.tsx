'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this business?');
    if (!confirmed) return;
    await fetch(`/api/businesses/${slug}`, {
      method: 'DELETE',
    });
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