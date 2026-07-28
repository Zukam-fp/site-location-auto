import { useMemo, useState } from "react";
import type { Vehicle } from "@/lib/fleet";
type Step = "form" | "recap" | "confirmed";
const LOCATIONS = [
  "Paris — Place Vendôme",
  "Paris — Aéroport Le Bourget",
  "Monaco — Port Hercule",
  "Genève — Aéroport",
  "Courchevel 1850",
  "Cannes — Croisette",
  "Saint-Tropez — Port",
];
const OPTIONS = [
  { id: "chauffeur", label: "Chauffeur privé", price: 350 },
  { id: "delivery", label: "Livraison à domicile", price: 250 },
  { id: "insurance", label: "Franchise rachetée", price: 180 },
  { id: "km", label: "Kilométrage illimité", price: 220 },
  { id: "child", label: "Sièges enfants ISOFIX", price: 0 },
];
type FormState = {
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  driverName: string;
  driverEmail: string;
  driverPhone: string;
  driverBirth: string;
  licenseYear: string;
  options: string[];
  notes: string;
};
const initial: FormState = {
  pickupDate: "",
  returnDate: "",
  pickupLocation: LOCATIONS[0],
  returnLocation: LOCATIONS[0],
  driverName: "",
  driverEmail: "",
  driverPhone: "",
  driverBirth: "",
  licenseYear: "",
  options: [],
  notes: "",
};
function daysBetween(a: string, b: string) {
  if (!a || !b) return 0;
  const d = (new Date(b).getTime() - new Date(a).getTime()) / 86400000;
  return d > 0 ? Math.ceil(d) : 0;
}
function priceToNumber(p: string) {
  return Number(p.replace(/\D/g, "")) || 0;
}
export function BookingForm({ vehicle }: { vehicle: Vehicle }) {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dailyRate = priceToNumber(vehicle.price);
  const days = daysBetween(form.pickupDate, form.returnDate);
  const optionsTotal = useMemo(
    () =>
      form.options.reduce(
        (a, id) =>
          a +
          (OPTIONS.find((o) => o.id === id)?.price ?? 0) * Math.max(days, 1),
        0,
      ),
    [form.options, days],
  );
  const subtotal = dailyRate * days + optionsTotal;
  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function toggleOption(id: string) {
    setForm((f) => ({
      ...f,
      options: f.options.includes(id)
        ? f.options.filter((o) => o !== id)
        : [...f.options, id],
    }));
  }
  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.pickupDate) e.pickupDate = "Requis";
    if (!form.returnDate) e.returnDate = "Requis";
    if (form.pickupDate && form.returnDate && days <= 0)
      e.returnDate = "Date de retour invalide";
    if (!form.driverName.trim() || form.driverName.length > 80)
      e.driverName = "Nom requis (max 80)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.driverEmail))
      e.driverEmail = "Email invalide";
    if (!/^[+0-9 .-]{6,20}$/.test(form.driverPhone))
      e.driverPhone = "Téléphone invalide";
    if (!form.driverBirth) e.driverBirth = "Requis";
    if (!/^\d{4}$/.test(form.licenseYear))
      e.licenseYear = "Année sur 4 chiffres";
    if (form.notes.length > 500) e.notes = "500 caractères maximum";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) setStep("recap");
  }
  if (step === "confirmed") {
    return (
      <div className="border border-border bg-card p-10 text-center">
        <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Confirmation
        </span>
        <h3 className="mb-4 text-3xl font-black uppercase tracking-tighter">
          Demande envoyée.
        </h3>
        <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground">
          Un conseiller Vitesse Elite vous contacte sous 2 heures pour finaliser
          votre réservation de{" "}
          <span className="text-foreground">{vehicle.name}</span>.
        </p>
        <button
          onClick={() => {
            setForm(initial);
            setStep("form");
          }}
          className="border border-border px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-secondary"
        >
          Nouvelle réservation
        </button>
      </div>
    );
  }
  if (step === "recap") {
    return (
      <div className="border border-border bg-card">
        <header className="border-b border-border p-6">
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Étape 2 / 2 — Récapitulatif
          </span>
          <h3 className="text-2xl font-black uppercase tracking-tighter md:text-3xl">
            Vérifiez votre demande.
          </h3>
        </header>
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
          <RecapBlock title="Véhicule">
            <RecapLine k="Modèle" v={vehicle.name} />
            <RecapLine k="Catégorie" v={vehicle.category} />
            <RecapLine k="Tarif" v={`${vehicle.price} / jour`} />
          </RecapBlock>
          <RecapBlock title="Location">
            <RecapLine
              k="Retrait"
              v={`${form.pickupDate} · ${form.pickupLocation}`}
            />
            <RecapLine
              k="Restitution"
              v={`${form.returnDate} · ${form.returnLocation}`}
            />
            <RecapLine k="Durée" v={`${days} jour${days > 1 ? "s" : ""}`} />
          </RecapBlock>
          <RecapBlock title="Conducteur">
            <RecapLine k="Nom" v={form.driverName} />
            <RecapLine k="Email" v={form.driverEmail} />
            <RecapLine k="Téléphone" v={form.driverPhone} />
            <RecapLine k="Naissance" v={form.driverBirth} />
            <RecapLine k="Permis depuis" v={form.licenseYear} />
          </RecapBlock>
          <RecapBlock title="Options">
            {form.options.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucune option sélectionnée.
              </p>
            ) : (
              form.options.map((id) => {
                const o = OPTIONS.find((x) => x.id === id)!;
                return (
                  <RecapLine
                    key={id}
                    k={o.label}
                    v={o.price ? `${o.price}€ / jour` : "Inclus"}
                  />
                );
              })
            )}
            {form.notes && (
              <div className="mt-3 border-t border-border pt-3">
                <span className="mb-1 block text-[10px] uppercase tracking-widest text-muted-foreground">
                  Notes
                </span>
                <p className="text-sm">{form.notes}</p>
              </div>
            )}
          </RecapBlock>
        </div>
        <div className="border-t border-border p-6">
          <div className="mb-6 space-y-2">
            <RecapLine
              k={`Véhicule × ${days}j`}
              v={`${dailyRate * days} €`}
              mono
            />
            <RecapLine k="Options" v={`${optionsTotal} €`} mono />
            <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Estimation totale
              </span>
              <span className="font-mono text-3xl">{subtotal} €</span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Hors caution. Tarif indicatif, confirmé par le conseiller.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setStep("form")}
              className="border border-border px-6 py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-secondary"
            >
              ← Modifier
            </button>
            <button
              onClick={() => setStep("confirmed")}
              className="flex-1 bg-foreground px-6 py-4 text-xs font-bold uppercase tracking-widest text-background hover:bg-neutral-200"
            >
              Confirmer la demande
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="border border-border bg-card">
      <header className="border-b border-border p-6">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Étape 1 / 2 — Réservation
        </span>
        <h3 className="text-2xl font-black uppercase tracking-tighter md:text-3xl">
          Réserver la {vehicle.name}.
        </h3>
      </header>
      <div className="space-y-8 p-6">
        <Fieldset legend="Dates & lieux">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Retrait" error={errors.pickupDate}>
              <input
                type="date"
                required
                value={form.pickupDate}
                onChange={(e) => set("pickupDate", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Restitution" error={errors.returnDate}>
              <input
                type="date"
                required
                value={form.returnDate}
                onChange={(e) => set("returnDate", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Lieu de retrait">
              <select
                value={form.pickupLocation}
                onChange={(e) => set("pickupLocation", e.target.value)}
                className={inputCls}
              >
                {LOCATIONS.map((l) => (
                  <option key={l} value={l} className="bg-background">
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Lieu de restitution">
              <select
                value={form.returnLocation}
                onChange={(e) => set("returnLocation", e.target.value)}
                className={inputCls}
              >
                {LOCATIONS.map((l) => (
                  <option key={l} value={l} className="bg-background">
                    {l}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Fieldset>
        <Fieldset legend="Conducteur principal">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Nom complet" error={errors.driverName}>
              <input
                type="text"
                maxLength={80}
                required
                value={form.driverName}
                onChange={(e) => set("driverName", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Email" error={errors.driverEmail}>
              <input
                type="email"
                maxLength={120}
                required
                value={form.driverEmail}
                onChange={(e) => set("driverEmail", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Téléphone" error={errors.driverPhone}>
              <input
                type="tel"
                maxLength={20}
                required
                value={form.driverPhone}
                onChange={(e) => set("driverPhone", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Date de naissance" error={errors.driverBirth}>
              <input
                type="date"
                required
                value={form.driverBirth}
                onChange={(e) => set("driverBirth", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Permis obtenu en (année)" error={errors.licenseYear}>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                required
                placeholder="2015"
                value={form.licenseYear}
                onChange={(e) =>
                  set("licenseYear", e.target.value.replace(/\D/g, ""))
                }
                className={inputCls}
              />
            </Field>
          </div>
        </Fieldset>
        <Fieldset legend="Options">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {OPTIONS.map((o) => {
              const active = form.options.includes(o.id);
              return (
                <label
                  key={o.id}
                  className={
                    "flex cursor-pointer items-center justify-between border p-4 transition-colors " +
                    (active
                      ? "border-white bg-secondary"
                      : "border-border hover:border-white/40")
                  }
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleOption(o.id)}
                      className="h-4 w-4 accent-white"
                    />
                    <span className="text-sm">{o.label}</span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {o.price ? `+${o.price}€/j` : "Inclus"}
                  </span>
                </label>
              );
            })}
          </div>
          <Field label="Demandes particulières" error={errors.notes}>
            <textarea
              rows={3}
              maxLength={500}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              className={inputCls + " resize-none"}
              placeholder="Préférence de couleur, horaire, itinéraire…"
            />
          </Field>
        </Fieldset>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Estimation {days > 0 ? `· ${days}j` : ""}
            </span>
            <span className="font-mono text-2xl">{subtotal} €</span>
          </div>
          <button
            type="submit"
            className="bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-neutral-200"
          >
            Voir le récapitulatif →
          </button>
        </div>
      </div>
    </form>
  );
}
const inputCls =
  "w-full border border-border bg-background px-3 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-white";
function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 block font-mono text-[10px] text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
function RecapBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 border-b border-border p-6 md:[&:nth-child(odd)]:border-r">
      <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {title}
      </span>
      {children}
    </div>
  );
}
function RecapLine({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
        {k}
      </span>
      <span className={"text-right text-sm " + (mono ? "font-mono" : "")}>
        {v}
      </span>
    </div>
  );
}
