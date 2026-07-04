'use client';

import { useActionState, useState } from 'react';
import { CircleCheck, Send } from 'lucide-react';
import { submitPrayerRequest, type PrayerRequestState } from '@/app/actions/prayer-requests';

export default function PrayerRequestForm() {
  const [state, formAction, pending] = useActionState<PrayerRequestState, FormData>(
    submitPrayerRequest,
    undefined
  );
  const [mode, setMode] = useState<'anonymous' | 'named'>('anonymous');
  const [wantsContact, setWantsContact] = useState(false);

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-brand-100 bg-white p-10 text-center shadow-sm">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <CircleCheck className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-xl font-bold text-brand-950">Your prayer request has been received</h2>
        <p className="mt-2 max-w-md text-brand-400">
          Thank you for trusting us with this. Our prayer team will be lifting it up.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-2xl border border-brand-100 bg-white p-8 shadow-sm">
      {/* Honeypot field — hidden from real visitors, often filled by bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-brand-950">
          How can we pray for you?
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={5}
          rows={5}
          className="mt-2 w-full rounded-xl border border-brand-100 px-4 py-3 text-brand-950 outline-none focus:border-brand-400"
          placeholder="Share as much or as little as you'd like..."
        />
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-brand-950">Would you like to share your name?</legend>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-6">
          <label className="flex items-center gap-2 text-sm text-brand-400">
            <input
              type="radio"
              name="mode"
              value="anonymous"
              checked={mode === 'anonymous'}
              onChange={() => setMode('anonymous')}
              className="h-4 w-4 accent-brand-700"
            />
            Submit anonymously
          </label>
          <label className="flex items-center gap-2 text-sm text-brand-400">
            <input
              type="radio"
              name="mode"
              value="named"
              checked={mode === 'named'}
              onChange={() => setMode('named')}
              className="h-4 w-4 accent-brand-700"
            />
            Include my name
          </label>
        </div>
      </fieldset>

      {mode === 'named' && (
        <div className="mt-4 space-y-4 border-t border-brand-50 pt-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-brand-950">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required={mode === 'named'}
              className="mt-2 w-full rounded-xl border border-brand-100 px-4 py-2.5 text-brand-950 outline-none focus:border-brand-400"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-brand-400">
            <input
              type="checkbox"
              name="wantsContact"
              checked={wantsContact}
              onChange={(e) => setWantsContact(e.target.checked)}
              className="h-4 w-4 accent-brand-700"
            />
            I&apos;d like someone to follow up with me
          </label>

          {wantsContact && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-semibold text-brand-950">
                  Email
                </label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  className="mt-2 w-full rounded-xl border border-brand-100 px-4 py-2.5 text-brand-950 outline-none focus:border-brand-400"
                />
              </div>
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-semibold text-brand-950">
                  Phone
                </label>
                <input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  className="mt-2 w-full rounded-xl border border-brand-100 px-4 py-2.5 text-brand-950 outline-none focus:border-brand-400"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {state && !state.ok && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {pending ? 'Submitting...' : 'Submit Prayer Request'}
      </button>
    </form>
  );
}
