import { createFileRoute, Link } from "@tanstack/react-router";

import heroPorsche from "@/assets/hero-porsche.jpg";
import interiorLeather from "@/assets/interior-leather.jpg";
import { fleet } from "@/lib/fleet";

const TITLE = "Vitesse Elite — Location de voitures de luxe à Paris, Monaco & Riviera";
const DESCRIPTION =
  "Location de véhicules d'exception : Ferrari, Lamborghini, Rolls-Royce, Porsche. Livraison sur mesure, conciergerie 24/7 à Paris, Monaco, Genève et Courchevel.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "location voiture de luxe, location supercar, Ferrari location, Lamborghini location, Rolls-Royce location, Porsche location, Paris Monaco Riviera",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoRental",
          name: "Vitesse Elite",
          description: DESCRIPTION,
          areaServed: ["Paris", "Monaco", "Genève", "Courchevel"],
          priceRange: "€€€€",
          telephone: "+33 1 89 22 33 00",
          email: "contact@vitesse-elite.fr",
        }),
      },
    ],
  }),
  component: Index,
});


const services = [
  {
    n: "01",
    title: "Conciergerie 24/7",
    desc: "Une assistance dédiée pour tous vos besoins, de la réservation de table à l'itinéraire de conduite.",
  },
  {
    n: "02",
    title: "Livraison sur mesure",
    desc: "Votre véhicule vous attend au tarmac de l'aéroport ou devant votre villa, partout en Europe.",
  },
  {
    n: "03",
    title: "Événementiel",
    desc: "Des flottes coordonnées pour vos mariages, lancements ou tournages de prestige.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-white selection:text-black">
      <Nav />
      <main>
        <Hero />
        <Fleet />
        <Services />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid h-20 max-w-screen-2xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6">
        <div className="flex min-w-0 items-center gap-6 md:gap-12">
          <a
            href="#"
            className="shrink-0 text-lg font-extrabold uppercase italic tracking-tighter md:text-xl"
          >
            Vitesse&bull;Elite
          </a>
          <div className="hidden gap-8 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:flex">
            <a href="#flotte" className="transition-colors hover:text-foreground">
              La Flotte
            </a>
            <a href="#services" className="transition-colors hover:text-foreground">
              Conciergerie
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Expériences
            </a>
          </div>
        </div>
        <a
          href="#reserver"
          className="shrink-0 border border-border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-foreground hover:text-background md:px-6"
        >
          Réserver
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      <img
        src={heroPorsche}
        alt="Porsche 911 GT3 dans un hangar en béton"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

      <div className="absolute bottom-10 left-0 right-0 px-6 md:bottom-20 md:left-20 md:right-auto md:max-w-2xl md:px-0">
        <div className="animate-slide-up mb-6 flex items-center gap-4">
          <div className="animate-line-reveal h-px w-12 bg-white" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            01 // La Précision
          </span>
        </div>
        <h1 className="animate-slide-up mb-8 text-balance text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl lg:text-8xl [animation-delay:100ms]">
          L'ingénierie
          <br />
          au service
          <br />
          de l'émotion.
        </h1>

        <form
          id="reserver"
          onSubmit={(e) => e.preventDefault()}
          className="animate-slide-up flex flex-col gap-px border border-white/10 bg-white/5 p-1 backdrop-blur-xl md:flex-row [animation-delay:200ms]"
        >
          <label className="flex-1 px-6 py-4">
            <span className="mb-1 block text-[9px] uppercase tracking-widest text-muted-foreground">
              Modèle
            </span>
            <select
              className="w-full appearance-none bg-transparent text-sm focus:outline-none"
              defaultValue="all"
            >
              <option value="all" className="bg-background">
                Toutes les catégories
              </option>
              <option value="super" className="bg-background">
                Supercars
              </option>
              <option value="prestige" className="bg-background">
                Luxe & Prestige
              </option>
            </select>
          </label>
          <div className="hidden w-px bg-white/10 md:block" />
          <label className="flex-1 px-6 py-4">
            <span className="mb-1 block text-[9px] uppercase tracking-widest text-muted-foreground">
              Dates
            </span>
            <input
              type="text"
              placeholder="24/05 — 28/05"
              className="w-full bg-transparent text-sm placeholder:text-muted-foreground/60 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-neutral-200 md:px-10"
          >
            Vérifier la disponibilité
          </button>
        </form>
      </div>
    </section>
  );
}

function Fleet() {
  return (
    <section id="flotte" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Catalogue 2026
            </span>
            <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
              La Flotte d'Exception
            </h2>
          </div>
          <a
            href="#flotte"
            className="border-b border-foreground pb-1 text-[10px] font-bold uppercase tracking-widest"
          >
            Voir tout
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {fleet.map((car) => (
            <Link
              key={car.slug}
              to="/vehicules/$slug"
              params={{ slug: car.slug }}
              className="group relative block border border-border bg-card transition-all hover:border-white/40"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-900">
                <img
                  src={car.cover}
                  alt={car.name}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold uppercase tracking-tight md:text-xl">
                    {car.name}
                  </h3>
                  <span className="shrink-0 font-mono text-sm">
                    {car.price}
                    <span className="text-[10px] text-muted-foreground">/j</span>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-border pt-4">
                  {car.specs.map((s) => (
                    <div key={s.label}>
                      <span className="block text-[9px] uppercase tracking-tighter text-muted-foreground">
                        {s.label}
                      </span>
                      <span className="font-mono text-[11px]">{s.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {car.category}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest transition-colors group-hover:text-foreground">
                    Découvrir →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-cream py-24 text-deep md:py-32">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:gap-20">
        <div>
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-widest text-deep/40">
            L'Expérience Vitesse
          </span>
          <h2 className="mb-8 text-balance text-4xl font-black uppercase leading-none tracking-tighter md:text-5xl">
            Plus qu'une location.
            <br /> Un service
            <br /> haute couture.
          </h2>
          <div className="space-y-6 md:space-y-8">
            {services.map((s, i) => (
              <div
                key={s.n}
                className={
                  "flex gap-6 pb-6 " +
                  (i < services.length - 1 ? "border-b border-deep/10" : "")
                }
              >
                <span className="font-mono text-sm text-deep/30">{s.n}</span>
                <div>
                  <h3 className="mb-2 font-bold uppercase">{s.title}</h3>
                  <p className="max-w-sm text-sm text-deep/60">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-sm bg-white">
            <img
              src={interiorLeather}
              alt="Intérieur cuir crème d'un véhicule de luxe"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-full w-full object-cover"
            />
          </div>
          <blockquote className="absolute -bottom-10 -left-10 hidden max-w-xs border border-border bg-background p-8 text-foreground lg:block">
            <p className="text-xs italic leading-relaxed">
              "Chaque détail est une affirmation de notre engagement envers l'excellence
              absolue."
            </p>
            <cite className="mt-4 block text-[9px] font-bold uppercase not-italic tracking-widest">
              — Jean-Luc R., Directeur Opérations
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-deep px-6 py-20">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-16 grid grid-cols-2 gap-12 md:mb-20 md:grid-cols-4">
          <div className="col-span-2">
            <span className="mb-6 block text-2xl font-extrabold uppercase italic tracking-tighter">
              Vitesse&bull;Elite
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              L'excellence automobile pour ceux qui ne font aucun compromis. Paris —
              Monaco — Genève — Courchevel.
            </p>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em]">
              Destinations
            </h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Paris Rive Gauche
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Monaco Carré d'Or
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Genève Lac
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Courchevel 1850
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em]">
              Contact
            </h4>
            <ul className="space-y-4 font-mono text-sm text-muted-foreground">
              <li>
                <a href="tel:+33189223300" className="hover:text-foreground">
                  +33 (0) 1 89 22 33 00
                </a>
              </li>
              <li>
                <a href="mailto:contact@vitesse-elite.fr" className="hover:text-foreground">
                  contact@vitesse-elite.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            © 2026 Vitesse Elite Automobile. Tous droits réservés.
          </span>
          <div className="flex gap-8">
            <a
              href="#"
              className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              Mentions Légales
            </a>
            <a
              href="#"
              className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
