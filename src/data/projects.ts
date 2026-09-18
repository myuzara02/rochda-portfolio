export interface GalleryItem {
  cap: string;
  /** Public path to the web-optimized photo, e.g. `/work/artivive/mockup-6.webp`. */
  src: string;
}

export interface Project {
  slug: string;
  name: string;
  sub: string;
  role: string;
  period: string;
  scope: string;
  tags: string[];
  prose: string[];
  /** Cover photo shown on the work overview card and top of the case page. */
  cover: string;
  /** Centered brand mark over the cover (white SVG on a dark veil). */
  logo: string;
  gallery: GalleryItem[];
  next: string;
}

export const site = {
  name: "Rochda Riswat Muliampati",
  title:
    "Rochda Riswat Muliampati — Graphic Designer, Photographer & Social Media Specialist",
  description:
    "Portfolio of Rochda Riswat Muliampati. Visual identity, commercial photography and social media management.",
  // ⚠ PLACEHOLDER — replace with the real address before launch.
  email: "hello@rochda.studio",
  linkedin: "https://www.linkedin.com/in/rochda-riswat-muliampati-0b88393a3/",
  location: "Tasikmalaya / Remote",
  coords: "7°20′S 108°13′E",
  timezone: "Asia/Jakarta",
  tzLabel: "GMT +7",
  year: 2026,
};

export const projects: Project[] = [
  {
    slug: "artivive",
    name: "Artivive",
    sub: "Visual identity, commercial photography and a social presence rebuilt around one consistent system.",
    role: "Graphic Designer, Photographer & Social Media Specialist",
    // ⚠ PLACEHOLDER — confirm with the client.
    period: "Jan 2024 — Present",
    scope: "Graphic Design, Photography, Social Media Management",
    tags: ["Graphic Design", "Photography", "Social Media Management"],
    prose: [
      "Artivive needed its design, imagery and publishing to read as one brand instead of three separate efforts. The work began with the visual system: a fixed type scale, a defined grid and a set of layout rules that hold from a print piece down to a single story frame.",
      "Photography was produced against the placements it would actually live in. Product and lifestyle sets were shot in batches, retouched to a shared contrast and colour reference, and delivered as a library with crops already prepared for each channel.",
      "On the social side, I run the calendar end to end: planning, asset production, copy, scheduling and monthly reporting. Posts are built from the same library and rules as the rest of the identity, which keeps the feed recognisable without repeating itself.",
    ],
    cover: "/work/artivive/mockup-6.webp",
    logo: "/logo/artivive.svg",
    gallery: [
      { cap: "Product mockup — studio set", src: "/work/artivive/mockup-2.webp" },
      { cap: "Product mockup — studio set", src: "/work/artivive/mockup-3.webp" },
      { cap: "Product mockup — studio set", src: "/work/artivive/mockup-4.webp" },
      { cap: "Product mockup — studio set", src: "/work/artivive/mockup-5.webp" },
      { cap: "Interior mockup — styled scene", src: "/work/artivive/living-room-4.webp" },
      { cap: "Interior mockup — styled scene", src: "/work/artivive/living-room-5.webp" },
      { cap: "Product mockup — studio set", src: "/work/artivive/mockup-7.webp" },
      { cap: "Retail display — etalase", src: "/work/artivive/etalase-produk.webp" },
      { cap: "Poster display — etalase", src: "/work/artivive/poster-etalase.webp" },
      { cap: "Product photography — detail", src: "/work/artivive/img-2049.webp" },
      { cap: "Product photography — detail", src: "/work/artivive/img-2013.webp" },
      { cap: "Product photography — studio set", src: "/work/artivive/img-1882.webp" },
      { cap: "Product photography — studio set", src: "/work/artivive/img-1901.webp" },
      { cap: "Product photography — studio set", src: "/work/artivive/img-1913.webp" },
      { cap: "Production still — on location", src: "/work/artivive/img-1922.webp" },
      { cap: "Product photography — studio set", src: "/work/artivive/img-1935.webp" },
      { cap: "Production still — on location", src: "/work/artivive/img-2187.webp" },
      { cap: "Production still — on location", src: "/work/artivive/img-2207.webp" },
      { cap: "Product photography — studio set", src: "/work/artivive/img-2231.webp" },
      { cap: "Product photography — studio set", src: "/work/artivive/img-2236.webp" },
      { cap: "Production still — on location", src: "/work/artivive/img-5179.webp" },
    ],
    next: "nadi-co",
  },
  {
    slug: "nadi-co",
    name: "Nadi & Co",
    sub: "Commercial photography and day-to-day social media management for a brand that publishes constantly.",
    role: "Photographer & Social Media Specialist",
    // ⚠ PLACEHOLDER — confirm with the client.
    period: "Mar 2023 — Dec 2023",
    scope: "Photography, Social Media Management",
    tags: ["Photography", "Social Media Management"],
    prose: [
      "Nadi & Co already had an identity. What it lacked was a supply of images good enough to carry it and a publishing rhythm that did not depend on whoever was free that week.",
      "I set up a repeatable shoot format: a fixed lighting setup, a shot list built from the coming month's calendar, and a naming and export convention so assets could be found and reused without a second shoot.",
      "Management covered planning, captions, scheduling and community response, reviewed monthly against reach and saves. Over the engagement the feed moved from ad-hoc posting to a consistent weekly cadence with a clear visual through-line.",
    ],
    cover: "/work/nadi-co/nadi-3.webp",
    logo: "/logo/nadi-co.svg",
    gallery: [
      { cap: "Editorial photography — series", src: "/work/nadi-co/nadi-1.webp" },
      { cap: "Editorial photography — series", src: "/work/nadi-co/nadi-2.webp" },
      { cap: "Editorial photography — series", src: "/work/nadi-co/nadi-4.webp" },
      { cap: "Editorial photography — series", src: "/work/nadi-co/nadi-5.webp" },
      { cap: "Production still — on location", src: "/work/nadi-co/img-5181.webp" },
      { cap: "Social feed layout — grid", src: "/work/nadi-co/feed-grid.webp" },
      { cap: "Social feed layout — grid", src: "/work/nadi-co/feed-grid-2.webp" },
      { cap: "Shoot day — behind the scenes", src: "/work/nadi-co/bts-1.webp" },
      { cap: "Shoot day — behind the scenes", src: "/work/nadi-co/bts-2.webp" },
    ],
    next: "artivive",
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
