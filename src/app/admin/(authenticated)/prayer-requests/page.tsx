import { requireRole } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import AdminPageHeader from '@/components/admin-page-header';

export default async function AdminPrayerRequestsPage() {
  // Restricted beyond a plain login check: these submissions can include
  // sensitive personal contact details from people seeking pastoral care.
  await requireRole('SUPER_ADMIN', 'EDITOR');

  const requests = await prisma.prayerRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <AdminPageHeader title="Prayer Requests" />

      {requests.length === 0 ? (
        <p className="text-gray-500">No prayer requests have been submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{request.createdAt.toLocaleString()}</span>
                <span className="font-medium text-gray-700">
                  {request.isAnonymous ? 'Anonymous' : request.name || 'Unnamed'}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-gray-900">{request.message}</p>
              {request.wantsContact && (
                <div className="mt-3 rounded bg-blue-50 px-3 py-2 text-sm text-blue-800">
                  Requested follow-up —{' '}
                  {[request.contactEmail, request.contactPhone].filter(Boolean).join(' · ') ||
                    'no contact details provided'}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
