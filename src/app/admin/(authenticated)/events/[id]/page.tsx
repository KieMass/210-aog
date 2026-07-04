import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { updateEvent } from '@/app/actions/events';
import AdminPageHeader from '@/components/admin-page-header';
import EventForm from '@/components/forms/event-form';

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader title="Edit Event" />
      <EventForm action={updateEvent.bind(null, id)} event={event} />
    </div>
  );
}
