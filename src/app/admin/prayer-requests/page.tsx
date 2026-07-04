import { verifySession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';

export default async function AdminPrayerRequestsPage() {
  await verifySession();

  const requests = await prisma.prayerRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <h1 className="text-2xl font-bold">Prayer Requests</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
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
      </main>
    </div>
  );
}
