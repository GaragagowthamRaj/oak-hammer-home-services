"use client";

import type { FormEvent, ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useId, useState } from "react";
import { copy, plans, services } from "@/lib/content";
import { cn } from "@/lib/cn";

type Method = "" | "phone" | "email";

type Values = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  method: Method;
};

type Errors = Partial<Record<keyof Values, string>>;

const fieldClass =
  "w-full border border-line bg-paper px-3 py-3 text-base text-ink outline-none transition-colors focus:border-forest";

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = copy.contact.errName;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = copy.contact.errEmail;
  if (values.phone.replace(/\D/g, "").length < 7) errors.phone = copy.contact.errPhone;
  if (!values.service) errors.service = copy.contact.errService;
  if (values.message.trim().length < 20) errors.message = copy.contact.errMessage;
  if (values.method !== "phone" && values.method !== "email") errors.method = copy.contact.errMethod;
  return errors;
}

function ContactFormFields() {
  const params = useSearchParams();
  const planKey = params.get("plan");
  const plan = plans.find((item) => item.key === planKey);
  const baseId = useId();
  const initial: Values = {
    name: "",
    email: "",
    phone: "",
    service: plan ? "home-maintenance" : "",
    message: "",
    method: "",
  };
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!plan) return;
    setValues((current) => (current.service ? current : { ...current, service: "home-maintenance" }));
  }, [plan]);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const first = (Object.keys(nextErrors) as Array<keyof Values>).find((key) => nextErrors[key]);
    if (first) {
      const target = first === "method" ? `${baseId}-method-phone` : `${baseId}-${first}`;
      document.getElementById(target)?.focus();
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <div role="status" className="fade-in flex min-h-[28rem] flex-col items-start justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-paper">
          <Check aria-hidden="true" />
        </div>
        <h3 className="mt-6 font-serif text-3xl tracking-[-0.03em]">{copy.contact.successTitle}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{copy.contact.successBody}</p>
        <button
          type="button"
          className="mt-8 min-h-11 border border-ink/20 px-5 text-sm font-medium hover:border-forest hover:text-forest"
          onClick={() => {
            setValues(initial);
            setErrors({});
            setSuccess(false);
          }}
        >
          {copy.contact.another}
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      {plan ? (
        <p className="border-l-2 border-brass pl-4 text-sm text-muted">
          Discussing the sample {plan.name} plan.
        </p>
      ) : null}
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted">{copy.contact.required}</p>

      <Field id={`${baseId}-name`} label={copy.contact.name} error={errors.name}>
        <input
          id={`${baseId}-name`}
          name="name"
          autoComplete="name"
          placeholder={copy.contact.namePh}
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
          onChange={(event) => update("name", event.target.value)}
          className={fieldClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${baseId}-email`} label={copy.contact.email} error={errors.email}>
          <input
            id={`${baseId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={copy.contact.emailPh}
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${baseId}-email-error` : undefined}
            onChange={(event) => update("email", event.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field id={`${baseId}-phone`} label={copy.contact.phone} error={errors.phone}>
          <input
            id={`${baseId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={copy.contact.phonePh}
            value={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${baseId}-phone-error` : undefined}
            onChange={(event) => update("phone", event.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field id={`${baseId}-service`} label={copy.contact.service} error={errors.service}>
        <div className="relative">
          <select
            id={`${baseId}-service`}
            name="service"
            value={values.service}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? `${baseId}-service-error` : undefined}
            onChange={(event) => update("service", event.target.value)}
            className={cn(fieldClass, "appearance-none pr-10")}
          >
            <option value="">{copy.contact.choose}</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
            <option value="unsure">{copy.contact.unsure}</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        </div>
      </Field>

      <Field id={`${baseId}-message`} label={copy.contact.message} error={errors.message}>
        <textarea
          id={`${baseId}-message`}
          name="message"
          rows={5}
          placeholder={copy.contact.messagePh}
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${baseId}-message-error` : undefined}
          onChange={(event) => update("message", event.target.value)}
          className={cn(fieldClass, "resize-y")}
        />
      </Field>

      <fieldset aria-describedby={errors.method ? `${baseId}-method-error` : undefined}>
        <legend className="text-sm font-medium">{copy.contact.method}</legend>
        <div className="mt-3 flex flex-wrap gap-6">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              id={`${baseId}-method-phone`}
              type="radio"
              name={`${baseId}-method`}
              value="phone"
              checked={values.method === "phone"}
              onChange={() => update("method", "phone")}
              className="h-4 w-4 accent-forest"
            />
            {copy.contact.methodPhone}
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              id={`${baseId}-method-email`}
              type="radio"
              name={`${baseId}-method`}
              value="email"
              checked={values.method === "email"}
              onChange={() => update("method", "email")}
              className="h-4 w-4 accent-forest"
            />
            {copy.contact.methodEmail}
          </label>
        </div>
        {errors.method ? (
          <p id={`${baseId}-method-error`} role="alert" className="mt-2 text-sm text-danger">
            {errors.method}
          </p>
        ) : null}
      </fieldset>

      <p className="text-xs leading-relaxed text-muted">{copy.contact.demo}</p>
      <button type="submit" className="min-h-12 w-full bg-forest px-5 text-sm font-medium text-paper transition-colors hover:bg-forest-deep sm:w-auto">
        {copy.contact.submit}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FormFallback() {
  return <div className="min-h-[36rem] bg-mist/50" aria-hidden="true" />;
}

export function ContactForm() {
  return (
    <Suspense fallback={<FormFallback />}>
      <ContactFormFields />
    </Suspense>
  );
}
