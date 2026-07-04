import { createEvent } from '@/app/actions/events';
import AdminPageHeader from '@/components/admin-page-header';
import EventForm from '@/components/forms/event-form';

export default function NewEventPage() {
  return (
    <div>
      <AdminPageHeader title="New Event" />
      <EventForm action={createEvent} />
    </div>
  );
}
