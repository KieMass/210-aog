'use client';

export default function DeleteButton({ label = 'Delete' }: { label?: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm('Are you sure you want to delete this? This cannot be undone.')) {
          e.preventDefault();
        }
      }}
      className="text-sm font-medium text-red-600 hover:text-red-800"
    >
      {label}
    </button>
  );
}
