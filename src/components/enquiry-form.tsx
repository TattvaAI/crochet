'use client';

import { useActionState } from 'react';
import { enquiryAction, type EnquiryState } from '@/app/actions';

const initial: EnquiryState = { status: 'idle' };

const inputCls =
  'field text-[1.05rem] focus:border-ink focus:outline-none';

/**
 * Progressive enhancement: this is a real <form> that works without
 * JavaScript. The Server Action adds inline validation and the
 * pending state on top. No client validation is duplicated here —
 * Zod owns the rules, one definition, both paths.
 */
export function EnquiryForm() {
  const [state, action, pending] = useActionState(enquiryAction, initial);

  const fieldError = (k: keyof NonNullable<EnquiryState['errors']>) =>
    state.status === 'error' && state.errors?.[k]
      ? state.errors[k]
      : undefined;

  if (state.status === 'success') {
    return (
      <div className="border border-hairline p-10">
        <p className="meta">Received</p>
        <h3 className="mt-6 font-display text-[2.5rem] leading-none">
          Thank you.
        </h3>
        <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
          Your enquiry is with the studio. You will have a straight answer
          within two working days — including if the answer is that we are not
          the right hands for it.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-10" noValidate>
      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="meta">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={`${inputCls} mt-3`}
            placeholder="Who is asking"
            aria-invalid={Boolean(fieldError('name'))}
            aria-describedby={fieldError('name') ? 'err-name' : undefined}
          />
          {fieldError('name') && (
            <p id="err-name" className="meta mt-2 text-accent">
              {fieldError('name')}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="meta">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={`${inputCls} mt-3`}
            placeholder="you@example.com"
            aria-invalid={Boolean(fieldError('email'))}
            aria-describedby={fieldError('email') ? 'err-email' : undefined}
          />
          {fieldError('email') && (
            <p id="err-email" className="meta mt-2 text-accent">
              {fieldError('email')}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="recipient" className="meta">
          Who is it for
        </label>
        <input
          id="recipient"
          name="recipient"
          type="text"
          className={`${inputCls} mt-3`}
          placeholder="The person this is for"
        />
        <p className="meta mt-3 leading-relaxed text-ink-mute">
          This changes what we recommend more than anything else you can tell
          us.
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <label htmlFor="tier" className="meta">
            Tier
          </label>
          <select id="tier" name="tier" className={`${inputCls} mt-3`} defaultValue="heritage">
            <option value="atelier">The Atelier — fully bespoke</option>
            <option value="heritage">The Heritage Collection</option>
            <option value="gift">The Ready Gift</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="meta">
            Needed by
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className={`${inputCls} mt-3`}
          />
          {fieldError('date') && (
            <p className="meta mt-2 text-accent">{fieldError('date')}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="meta">
          Budget (₹)
        </label>
        <input
          id="budget"
          name="budget"
          type="number"
          inputMode="numeric"
          min={0}
          step={500}
          className={`${inputCls} mt-3`}
          placeholder="4500 – 90000"
        />
        {fieldError('budget') && (
          <p className="meta mt-2 text-accent">{fieldError('budget')}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="meta">
          Anything else
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="field mt-3 resize-none"
          placeholder="Where it will live, the palette, a name or date to weave in"
        />
      </div>

      {state.status === 'error' && state.formError && (
        <p className="border-l-2 border-accent pl-4 text-sm text-ink-soft">
          {state.formError}
        </p>
      )}

      {/* Honeypot — bots fill it, humans never see it. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="meta bg-ink px-8 py-4 text-ground transition-colors duration-500 hover:bg-accent disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'Send enquiry'}
        </button>
        <p className="meta mt-5 max-w-md leading-relaxed text-ink-mute">
          No deposit is taken here. A straight answer within two working days.
        </p>
      </div>
    </form>
  );
}
