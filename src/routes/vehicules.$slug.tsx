import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { fleet, getVehicleBySlug, type Vehicle } from "@/lib/fleet";
import { BookingForm } from "@/components/bookingform";

export const Route = createFileRoute("/vehicules/$slug")({
  loader: ({ params }) => {
    const vehicle = getVehicleBySlug(params.slug);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Véhicule introuvable — Vitesse Elite" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const v = loaderData.vehicle;
    const title = `${v.name} — Location ${v.category} | Vitesse Elite`;
    const desc = `${v.tagline} À partir de ${v.price}/jour. ${v.description.slice(0, 110)}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/vehicules/${v.slug}` },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `/vehicules/${v.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: v.name,
            description: v.description,
            category: v.category,
            offers: {
              "@type": "Offer",
              price: v.price.replace(/\D/g, ""),
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: (
                v.reviews.reduce((a, r) => a + r.rating, 0) / v.reviews.length
              ).toFixed(1),
              reviewCount: v.reviews.length,
            },
            review: v.reviews.map((r) => ({
              "@type": "Review",
              author: { "@type": "Person", name: r.author },
              reviewRating: {
                "@type": "Rating",
                ratingValue: r.rating,
                bestRating: 5,
              },
              reviewBody: r.text,
            })),
          }),
        },
      ],
    };
  },
  component: VehiclePage,
});

function VehiclePage() {
  const { vehicle } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <TopBar />
      <main>
        <Hero vehicle={vehicle} />
        <Specs vehicle={vehicle} />
        <Conditions vehicle={vehicle} />
        <Booking vehicle={vehicle} />
        <Reviews vehicle={vehicle} />
        <RelatedFleet currentSlug={vehicle.slug} />
      </main>
      <FooterMin />
    </div>
  );
}

function Booking({ vehicle }: { vehicle: Vehicle }) {
  return (
    <section id="reserver" className="border-b border-border px-6 py-20">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 md:grid-cols-[1fr_1.6fr]">
        <div>
          <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Réservation
          </span>
          <h2 className="text-3xl font-black uppercase leading-none tracking-tighter md:text-5xl">
            Configurez
            <br /> votre location.
          </h2>
          <p className="mt-6 max-w-sm text-sm text-muted-foreground">
            Dates, lieux, conducteur, options — validez un récapitulatif avant
            confirmation. Un conseiller vous rappelle sous 2 heures.
          </p>
        </div>
        <BookingForm vehicle={vehicle} />
      </div>
    </section>
  );
}

function TopBar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between gap-4 px-6">
        <Link
          to="/"
          className="text-lg font-extrabold uppercase italic tracking-tighter md:text-xl"
        >
          Vitesse&bull;Elite
        </Link>
        <Link
          to="/"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Retour à la flotte
        </Link>
      </div>
    </nav>
  );
}

function Hero({ vehicle }: { vehicle: Vehicle }) {
  const [active, setActive] = useState(0);
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr] md:py-16">
        <div>
          <div className="mb-4 aspect-[4/3] w-full overflow-hidden bg-neutral-900">
            <img
              src={vehicle.gallery[active].src}
              alt={vehicle.gallery[active].alt}
              width={1200}
              height={900}
              className="h-full w-full object-cover transition-opacity duration-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {vehicle.gallery.map((g, i) => (
              <button
                key={g.src + i}
                onClick={() => setActive(i)}
                aria-label={`Voir photo ${i + 1}`}
                className={
                  "aspect-[4/3] overflow-hidden border transition-all " +
                  (i === active
                    ? "border-white"
                    : "border-border opacity-60 hover:opacity-100")
                }
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {vehicle.category}
          </span>
          <h1 className="mb-4 text-balance text-4xl font-black uppercase leading-[0.95] tracking-tighter md:text-6xl">
            {vehicle.name}
          </h1>
          <p className="mb-6 text-base italic text-muted-foreground">
            {vehicle.tagline}
          </p>
          <p className="mb-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {vehicle.description}
          </p>

          <div className="mb-8 grid grid-cols-3 gap-4 border-y border-border py-6">
            {vehicle.specs.map((s) => (
              <div key={s.label}>
                <span className="block text-[9px] uppercase tracking-tighter text-muted-foreground">
                  {s.label}
                </span>
                <span className="font-mono text-sm">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-2xl">
              {vehicle.price}
              <span className="text-xs text-muted-foreground">/jour</span>
            </span>
            <a
              href="mailto:contact@vitesse-elite.fr"
              className="bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-neutral-200"
            >
              Réserver ce modèle
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Specs({ vehicle }: { vehicle: Vehicle }) {
  return (
    <section className="border-b border-border px-6 py-20">
      <div className="mx-auto max-w-screen-2xl">
        <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Fiche technique
        </span>
        <h2 className="mb-10 text-3xl font-bold uppercase tracking-tight md:text-4xl">
          Caractéristiques détaillées
        </h2>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
          {vehicle.detailedSpecs.map((s) => (
            <div key={s.label} className="border-t border-border pt-4">
              <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {s.label}
              </dt>
              <dd className="mt-2 font-mono text-lg">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Conditions({ vehicle }: { vehicle: Vehicle }) {
  return (
    <section className="bg-cream px-6 py-20 text-deep">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-deep/40">
            Conditions
          </span>
          <h2 className="text-3xl font-black uppercase leading-none tracking-tighter md:text-4xl">
            Louer en toute
            <br /> sérénité.
          </h2>
        </div>
        <ul className="space-y-4">
          {vehicle.conditions.map((c, i) => (
            <li
              key={c}
              className="flex gap-4 border-b border-deep/10 pb-4 last:border-b-0"
            >
              <span className="font-mono text-xs text-deep/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span
      aria-label={`${n} sur 5`}
      className="font-mono text-xs tracking-widest"
    >
      {"★".repeat(n)}
      <span className="text-muted-foreground">{"★".repeat(5 - n)}</span>
    </span>
  );
}

function Reviews({ vehicle }: { vehicle: Vehicle }) {
  const avg =
    vehicle.reviews.reduce((a, r) => a + r.rating, 0) / vehicle.reviews.length;
  return (
    <section className="border-b border-border px-6 py-20">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Avis clients
            </span>
            <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
              Ils l'ont conduite.
            </h2>
          </div>
          <div className="text-right">
            <div className="font-mono text-3xl">{avg.toFixed(1)}/5</div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {vehicle.reviews.length} avis vérifiés
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {vehicle.reviews.map((r) => (
            <article
              key={r.author + r.date}
              className="flex flex-col border border-border p-6"
            >
              <Stars n={r.rating} />
              <p className="mt-4 flex-1 text-sm italic leading-relaxed text-muted-foreground">
                « {r.text} »
              </p>
              <footer className="mt-6 border-t border-border pt-4">
                <div className="text-sm font-bold uppercase tracking-tight">
                  {r.author}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {r.city} · {r.date}
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedFleet({ currentSlug }: { currentSlug: string }) {
  const others = fleet.filter((v) => v.slug !== currentSlug);
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-screen-2xl">
        <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Poursuivre l'exploration
        </span>
        <h2 className="mb-10 text-3xl font-bold uppercase tracking-tight md:text-4xl">
          Autres modèles
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {others.map((v) => (
            <Link
              key={v.slug}
              to="/vehicules/$slug"
              params={{ slug: v.slug }}
              className="group relative overflow-hidden border border-border bg-card transition-all hover:border-white/40"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                <img
                  src={v.cover}
                  alt={v.name}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                />
              </div>
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tight">
                    {v.name}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {v.category}
                  </span>
                </div>
                <span className="font-mono text-sm">
                  {v.price}
                  <span className="text-[10px] text-muted-foreground">/j</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterMin() {
  return (
    <footer className="border-t border-border bg-deep px-6 py-12">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 md:flex-row">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          © 2026 Vitesse Elite Automobile.
        </span>
        <a
          href="mailto:contact@vitesse-elite.fr"
          className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          contact@vitesse-elite.fr
        </a>
      </div>
    </footer>
  );
}
