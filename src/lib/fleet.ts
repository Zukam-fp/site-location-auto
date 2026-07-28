import heroPorsche from "@/assets/hero-porsche.jpg";
import carLamborghini from "@/assets/car-lamborghini.jpg";
import carRollsRoyce from "@/assets/car-rollsroyce.jpg";
import carFerrari from "@/assets/car-ferrari.jpg";
import interiorLeather from "@/assets/interior-leather.jpg";

export type Spec = { label: string; value: string };
export type Review = {
  author: string;
  city: string;
  rating: number;
  date: string;
  text: string;
};

export type Vehicle = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: string;
  cover: string;
  gallery: { src: string; alt: string }[];
  specs: Spec[];
  detailedSpecs: Spec[];
  conditions: string[];
  reviews: Review[];
};

export const fleet: Vehicle[] = [
  {
    slug: "lamborghini-revuelto",
    name: "Lamborghini Revuelto",
    category: "Supercar Hybride V12",
    tagline: "L'hybride qui redéfinit la fureur italienne.",
    description:
      "Le fer de lance de Sant'Agata. Un V12 6.5L couplé à trois moteurs électriques pour 1015 CV de rage maîtrisée. Design en fibre de carbone, aérodynamique active et rugissement iconique.",
    price: "2 400€",
    cover: carLamborghini,
    gallery: [
      { src: carLamborghini, alt: "Lamborghini Revuelto vue trois-quarts" },
      { src: interiorLeather, alt: "Habitacle cuir et carbone Lamborghini" },
      { src: heroPorsche, alt: "Lamborghini Revuelto dans un hangar béton" },
    ],
    specs: [
      { label: "Puissance", value: "1015 CV" },
      { label: "0-100 km/h", value: "2.5s" },
      { label: "Moteur", value: "V12 Hybrid" },
    ],
    detailedSpecs: [
      { label: "Cylindrée", value: "6498 cm³" },
      { label: "Couple", value: "725 Nm" },
      { label: "Vitesse max", value: "350 km/h" },
      { label: "Transmission", value: "8 rapports DCT" },
      { label: "Transmission intégrale", value: "4 roues motrices" },
      { label: "Poids", value: "1772 kg" },
      { label: "Places", value: "2" },
      { label: "Coffre", value: "150 L" },
    ],
    conditions: [
      "Âge minimum : 30 ans",
      "Permis B valide depuis 5 ans",
      "Caution : 30 000€ (empreinte CB)",
      "Kilométrage inclus : 150 km/jour, 0.80€/km supplémentaire",
      "Assurance tous risques incluse, franchise 15 000€",
      "Livraison offerte dans Paris, Monaco et Genève",
    ],
    reviews: [
      {
        author: "Alexandre D.",
        city: "Paris 16e",
        rating: 5,
        date: "Mars 2026",
        text: "Une expérience mécanique brutale et raffinée. Livraison au Bourget impeccable, équipe irréprochable.",
      },
      {
        author: "Sophia M.",
        city: "Monaco",
        rating: 5,
        date: "Février 2026",
        text: "Week-end sur la côte inoubliable. La Revuelto attire tous les regards, le service Vitesse est à la hauteur.",
      },
      {
        author: "Karim B.",
        city: "Genève",
        rating: 4,
        date: "Janvier 2026",
        text: "Voiture parfaitement préparée. Seul bémol : la restitution un dimanche soir un peu tardive.",
      },
    ],
  },
  {
    slug: "rolls-royce-spectre",
    name: "Rolls-Royce Spectre",
    category: "Coupé électrique de prestige",
    tagline: "Le silence absolu du luxe britannique.",
    description:
      "Première Rolls-Royce 100% électrique. Un coupé Grand Tourisme de 5.45m, taillé pour effacer les distances dans un silence irréel. Cuir sur mesure, ciel étoilé et confort magistral.",
    price: "3 100€",
    cover: carRollsRoyce,
    gallery: [
      { src: carRollsRoyce, alt: "Rolls-Royce Spectre profil" },
      { src: interiorLeather, alt: "Intérieur cuir crème Rolls-Royce" },
      { src: heroPorsche, alt: "Rolls-Royce Spectre en environnement urbain" },
    ],
    specs: [
      { label: "Puissance", value: "584 CV" },
      { label: "Autonomie", value: "530 km" },
      { label: "Type", value: "Électrique" },
    ],
    detailedSpecs: [
      { label: "Couple", value: "900 Nm" },
      { label: "0-100 km/h", value: "4.5s" },
      { label: "Batterie", value: "102 kWh" },
      { label: "Recharge DC", value: "195 kW" },
      { label: "Transmission", value: "Intégrale" },
      { label: "Poids", value: "2975 kg" },
      { label: "Places", value: "4" },
      { label: "Coffre", value: "300 L" },
    ],
    conditions: [
      "Âge minimum : 28 ans",
      "Permis B valide depuis 3 ans",
      "Caution : 25 000€ (empreinte CB)",
      "Kilométrage inclus : 200 km/jour, 0.60€/km supplémentaire",
      "Chauffeur privé disponible en option (350€/jour)",
      "Livraison offerte en Île-de-France et Riviera",
    ],
    reviews: [
      {
        author: "Isabelle C.",
        city: "Paris 8e",
        rating: 5,
        date: "Avril 2026",
        text: "Silence, sérénité, prestige. Utilisée pour un mariage à Fontainebleau. Absolument parfait.",
      },
      {
        author: "William H.",
        city: "Courchevel",
        rating: 5,
        date: "Mars 2026",
        text: "Livraison au chalet à 1850m. Le ciel étoilé de nuit est magique. Reviens l'année prochaine.",
      },
      {
        author: "Léa T.",
        city: "Paris 7e",
        rating: 5,
        date: "Février 2026",
        text: "Le confort à un niveau que je ne soupçonnais pas. Conciergerie parfaite du début à la fin.",
      },
    ],
  },
  {
    slug: "ferrari-purosangue",
    name: "Ferrari Purosangue",
    category: "SUV V12 4 places",
    tagline: "Le premier Ferrari à quatre portes, sans compromis.",
    description:
      "Un V12 atmosphérique de 725 CV dans une carrosserie 4 places. Suspension active True Active Spool Valve, transmission intégrale et acoustique de Maranello. Le sport en famille.",
    price: "2 800€",
    cover: carFerrari,
    gallery: [
      { src: carFerrari, alt: "Ferrari Purosangue vue avant" },
      { src: interiorLeather, alt: "Intérieur cuir Ferrari Purosangue" },
      { src: heroPorsche, alt: "Ferrari Purosangue en atelier" },
    ],
    specs: [
      { label: "Puissance", value: "725 CV" },
      { label: "0-100 km/h", value: "3.3s" },
      { label: "Config", value: "4 Places" },
    ],
    detailedSpecs: [
      { label: "Cylindrée", value: "6496 cm³" },
      { label: "Couple", value: "716 Nm" },
      { label: "Vitesse max", value: "310 km/h" },
      { label: "Transmission", value: "8 rapports DCT" },
      { label: "Transmission intégrale", value: "4RM + 4RD" },
      { label: "Poids", value: "2033 kg" },
      { label: "Places", value: "4" },
      { label: "Coffre", value: "473 L" },
    ],
    conditions: [
      "Âge minimum : 30 ans",
      "Permis B valide depuis 5 ans",
      "Caution : 28 000€ (empreinte CB)",
      "Kilométrage inclus : 200 km/jour, 0.75€/km supplémentaire",
      "Assurance tous risques incluse, franchise 12 000€",
      "Sièges enfants ISOFIX disponibles sans supplément",
    ],
    reviews: [
      {
        author: "Marc L.",
        city: "Neuilly-sur-Seine",
        rating: 5,
        date: "Avril 2026",
        text: "Une Ferrari familiale qui tient toutes ses promesses. Enfants ravis, femme conquise, moi aussi.",
      },
      {
        author: "Émilie R.",
        city: "Cannes",
        rating: 5,
        date: "Mars 2026",
        text: "Utilisée pour la montée des marches. Élégance et puissance, l'équation parfaite.",
      },
      {
        author: "Julien P.",
        city: "Saint-Tropez",
        rating: 4,
        date: "Février 2026",
        text: "Sensationnelle. Consommation à surveiller sur autoroute mais quel plaisir sonore.",
      },
    ],
  },
];

export const getVehicleBySlug = (slug: string) =>
  fleet.find((v) => v.slug === slug);
