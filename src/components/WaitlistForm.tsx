"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/Icon";
import { CONTACT_EMAIL, PRIVACY_URL } from "@/lib/site";
import {
  CASES_OPTIONS,
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  POS_OPTIONS,
  TASTING_ROOM_OPTIONS,
  WAITLIST_ENDPOINT,
  WAITLIST_FIELDS,
  WAITLIST_SITE,
  WAITLIST_SUBJECT,
  WAITLIST_TIMEOUT_MS,
} from "@/lib/waitlist";

type Status = "idle" | "submitting" | "success" | "error" | "unavailable";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/* Honeypot. The name and label avoid words ("company", "website", "url") that browser autofill matches on. */
const HONEYPOT = "hp_rhea";

function emailProblem(value: string): string | null {
  if (!value) return "Enter your work email.";
  if (value.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(value)) {
    return "Enter a valid email, like name@yourwinery.com.";
  }
  return null;
}

/** Keep only values the form actually offers (a tampered option is dropped). */
function allowed(value: string, options: readonly string[]): string {
  return options.includes(value) ? value : "";
}

/** Reads `{ message }` from a provider's JSON error body, if there is one. */
async function providerMessage(response: Response): Promise<string | null> {
  const json: unknown = await response.json().catch(() => null);
  if (json && typeof json === "object" && "message" in json) {
    const message = String((json as { message: unknown }).message ?? "")
      .trim()
      .slice(0, 200)
      .replace(/[\s.!]+$/, "");
    if (message) return message;
  }
  return null;
}

const fieldClass =
  "block h-12 w-full rounded-xl border border-field bg-surface px-4 text-base text-ink shadow-[0_1px_2px_rgb(14_17_22/0.04)] transition-[border-color,box-shadow] placeholder:text-subtle hover:border-field-hover focus-visible:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink/10 disabled:opacity-60 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/10";

/* While the empty "Select" option is chosen, show it muted like a placeholder. */
const selectClass = `${fieldClass} select-chevron mt-2 has-[option[value='']:checked]:text-subtle [&_option]:text-ink`;

const labelClass = "block text-[0.9375rem] font-medium text-ink";
const optional = <span className="font-normal text-subtle">(optional)</span>;

function Select({ id, name, label, options }: { id: string; name: string; label: string; options: readonly string[] }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label} {optional}
      </label>
      <select id={id} name={name} defaultValue="" className={selectClass}>
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  // Synchronous lock: `status` in this closure can be stale if two submit events land in the same task.
  const inFlight = useRef(false);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function submit() {
    const form = formRef.current;
    if (!form || inFlight.current) return;

    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const email = value(WAITLIST_FIELDS.email);
    const problem = emailProblem(email);
    setEmailError(problem);
    if (problem) {
      emailRef.current?.focus();
      return;
    }

    // Bots tend to fill every field. Pretend it worked and send nothing.
    if (value(HONEYPOT)) {
      setStatus("success");
      return;
    }

    if (!WAITLIST_ENDPOINT) {
      setStatus("unavailable");
      return;
    }

    const body = new URLSearchParams();
    body.set(WAITLIST_FIELDS.email, email);
    body.set(WAITLIST_FIELDS.subject, WAITLIST_SUBJECT);
    body.set(WAITLIST_FIELDS.site, WAITLIST_SITE);
    const optionalFields = [
      [WAITLIST_FIELDS.name, value(WAITLIST_FIELDS.name).slice(0, NAME_MAX_LENGTH).trim()],
      [WAITLIST_FIELDS.tastingRooms, allowed(value(WAITLIST_FIELDS.tastingRooms), TASTING_ROOM_OPTIONS)],
      [WAITLIST_FIELDS.cases, allowed(value(WAITLIST_FIELDS.cases), CASES_OPTIONS)],
      [WAITLIST_FIELDS.pos, allowed(value(WAITLIST_FIELDS.pos), POS_OPTIONS)],
    ] as const;
    for (const [field, fieldValue] of optionalFields) {
      if (fieldValue) body.set(field, fieldValue);
    }

    inFlight.current = true;
    setErrorDetail(null);
    setStatus("submitting");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), WAITLIST_TIMEOUT_MS);
    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        signal: controller.signal,
      });
      if (response.ok) {
        setStatus("success");
        return;
      }
      const message = await providerMessage(response);
      // Already on the list: that's the outcome the visitor wanted.
      if (response.status === 409 || (message && /already/i.test(message))) {
        setStatus("success");
        return;
      }
      setErrorDetail(message);
      setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timer);
      inFlight.current = false;
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit();
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex scroll-mt-28 flex-col items-start gap-5 py-6 outline-none sm:py-10"
      >
        <span className="grid size-12 place-items-center rounded-full bg-sage-wash text-sage-ink">
          <Icon name="check" className="size-6" strokeWidth={2} />
        </span>
        <p className="text-2xl font-semibold tracking-[-0.015em] text-ink">You’re on the list. We’ll be in touch.</p>
        <p className="text-base leading-relaxed text-muted">
          Questions before then? Email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    // method/action are the no-JavaScript fallback: a plain POST to the provider, so an email never ends up in a
    // URL. With JavaScript, onSubmit sends it with fetch instead.
    <form
      ref={formRef}
      method="post"
      action={WAITLIST_ENDPOINT || undefined}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="waitlist-form-title"
      aria-busy={submitting}
      className="@container relative"
    >
      <h3 id="waitlist-form-title" className="text-xl font-semibold tracking-[-0.015em] text-ink">
        Request a pilot spot
      </h3>
      <p className="mt-1.5 text-[0.9375rem] text-muted">Takes about 20 seconds.</p>

      <input type="hidden" name={WAITLIST_FIELDS.subject} value={WAITLIST_SUBJECT} />
      <input type="hidden" name={WAITLIST_FIELDS.site} value={WAITLIST_SITE} />

      <fieldset disabled={submitting} className="mt-7 grid gap-5">
        <div>
          <label htmlFor="waitlist-email" className={labelClass}>
            Work email
          </label>
          <input
            ref={emailRef}
            id="waitlist-email"
            name={WAITLIST_FIELDS.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            maxLength={EMAIL_MAX_LENGTH}
            required
            aria-required="true"
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? "waitlist-email-error" : undefined}
            placeholder="you@yourwinery.com"
            className={`${fieldClass} mt-2`}
            onChange={(event) => {
              if (emailError && !emailProblem(event.currentTarget.value.trim())) setEmailError(null);
            }}
          />
          {emailError && (
            <p id="waitlist-email-error" role="alert" className="mt-2 text-sm font-medium text-danger">
              {emailError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="waitlist-name" className={labelClass}>
            First name {optional}
          </label>
          <input
            id="waitlist-name"
            name={WAITLIST_FIELDS.name}
            type="text"
            autoComplete="given-name"
            maxLength={NAME_MAX_LENGTH}
            className={`${fieldClass} mt-2`}
          />
        </div>

        <div className="grid gap-5 @sm:grid-cols-2">
          <Select id="waitlist-rooms" name={WAITLIST_FIELDS.tastingRooms} label="Tasting rooms" options={TASTING_ROOM_OPTIONS} />
          <Select id="waitlist-cases" name={WAITLIST_FIELDS.cases} label="Cases a year" options={CASES_OPTIONS} />
        </div>
        <Select id="waitlist-pos" name={WAITLIST_FIELDS.pos} label="Main POS" options={POS_OPTIONS} />

        {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
        <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="waitlist-hp">Leave this field empty</label>
          <input id="waitlist-hp" name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Notice at collection: shown before the button, not after it. */}
        <p className="text-pretty text-sm leading-relaxed text-subtle">
          We’ll email you about Rhea’s pilot. Unsubscribe anytime. See our{" "}
          <a
            href={PRIVACY_URL}
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
          >
            privacy notice
          </a>
          .
        </p>

        <button type="submit" className="btn-primary h-13 w-full px-6 text-[1.0625rem] disabled:cursor-wait">
          {submitting ? (
            <>
              <span
                aria-hidden="true"
                className="size-4 rounded-full border-2 border-white/30 border-t-white motion-safe:animate-spin"
              />
              Joining…
            </>
          ) : (
            <>
              Join the pilot waitlist
              <Icon name="arrowRight" className="btn-arrow size-5" />
            </>
          )}
        </button>
      </fieldset>

      <div aria-live="polite">
        {status === "unavailable" && (
          <p className="mt-5 rounded-xl border border-line bg-paper-2 px-4 py-3 text-[0.9375rem] text-ink">
            Waitlist signups open soon. In the meantime, email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium underline decoration-line-strong underline-offset-4 hover:decoration-ink"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        )}
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-5 flex flex-col gap-3 rounded-xl border border-danger/25 bg-danger-wash px-4 py-3 text-[0.9375rem] text-ink @md:flex-row @md:items-center @md:justify-between"
        >
          <p className="text-pretty">
            {errorDetail ? (
              <>We couldn’t add you: {errorDetail}. Check your details and try again, </>
            ) : (
              <>We couldn’t add you just now. Check your connection and try again, </>
            )}
            or email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline decoration-danger/40 underline-offset-4">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => void submit()}
            className="shrink-0 self-start rounded-lg border border-ink/15 bg-surface px-3.5 py-2 text-sm font-semibold text-ink hover:border-ink/40 @md:self-center"
          >
            Try again
          </button>
        </div>
      )}
    </form>
  );
}
