export interface GalleryItem {
  cap: string;
  /** Public path to the web-optimized photo, e.g. `/work/artivive/mockup-6.webp`. */
  src: string;
}

export interface ProjectSection {
  label: string;
  body: string[];
  /** Set `false` to hide without deleting. Defaults to `true`. */
  render?: boolean;
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
  /** Extra `case-desc` blocks rendered after Description. Edit freely per project. */
  sections?: ProjectSection[];
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
  email: "rochdamuliampati01@gmail.com",
  linkedin: "https://www.linkedin.com/in/rochda-riswat-muliampati-0b88393a3/",
  location: "Garut, Indonesia",
  coords: "6°56'49\" – 7°45'00\"",
  timezone: "Asia/Jakarta",
  tzLabel: "GMT +7",
  year: 2026,
};

export const projects: Project[] = [
  {
    slug: "artivive",
    name: "Artivive",
    sub: "Framed art and Visual Print",
    role: "Operations and Creative Staff",
    period: "Jan 2026 — Present",
    scope: "Graphic Design, Photography, Social Media Management",
    tags: [
      "Graphic Design",
      "Photography",
      "Social Media Management",
    ],
    prose: [
      "Artivive needed its design, imagery and publishing to read as one brand instead of three separate efforts. The work began with the visual system: a fixed type scale, a defined grid and a set of layout rules that hold from a print piece down to a single story frame.",
    ],
    sections: [
      {
        label: "WHAT I DO",
        body: [
          "Design & Creative: Production of graphic design, content, and visual assets, as well as preparation of print materials.",
          "Partnerships & Commercial Procurement (B2B): Handling the provision of poster decorations and framing for various cafes and restaurants, both through creative collaboration projects and custom orders based on client needs.",
          "Coordination & Strategy: Collaborating with business partners on marketing strategies, social media management, and operational goals.",
        ],
      },
    ],
    cover: "/work/artivive/mockup-6.webp",
    logo: "/logo/artivive.svg",
    gallery: [
      {
        cap: "Product mockup — studio set",
        src: "/work/artivive/mockup-2.webp",
      },
      {
        cap: "Product mockup — studio set",
        src: "/work/artivive/mockup-3.webp",
      },
      {
        cap: "Product mockup — studio set",
        src: "/work/artivive/mockup-4.webp",
      },
      {
        cap: "Product mockup — studio set",
        src: "/work/artivive/mockup-5.webp",
      },
      {
        cap: "Interior mockup — styled scene",
        src: "/work/artivive/living-room-4.webp",
      },
      {
        cap: "Interior mockup — styled scene",
        src: "/work/artivive/living-room-5.webp",
      },
      {
        cap: "Product mockup — studio set",
        src: "/work/artivive/mockup-7.webp",
      },
      {
        cap: "Retail display — etalase",
        src: "/work/artivive/etalase-produk.webp",
      },
      {
        cap: "Poster display — etalase",
        src: "/work/artivive/poster-etalase.webp",
      },
      {
        cap: "Product photography — detail",
        src: "/work/artivive/img-2049.webp",
      },
      {
        cap: "Product photography — detail",
        src: "/work/artivive/img-2013.webp",
      },
      {
        cap: "Product photography — studio set",
        src: "/work/artivive/img-1882.webp",
      },
      {
        cap: "Product photography — studio set",
        src: "/work/artivive/img-1901.webp",
      },
      {
        cap: "Product photography — studio set",
        src: "/work/artivive/img-1913.webp",
      },
      {
        cap: "Production still — on location",
        src: "/work/artivive/img-1922.webp",
      },
      {
        cap: "Product photography — studio set",
        src: "/work/artivive/img-1935.webp",
      },
      {
        cap: "Production still — on location",
        src: "/work/artivive/img-2187.webp",
      },
      {
        cap: "Production still — on location",
        src: "/work/artivive/img-2207.webp",
      },
      {
        cap: "Product photography — studio set",
        src: "/work/artivive/img-2231.webp",
      },
      {
        cap: "Product photography — studio set",
        src: "/work/artivive/img-2236.webp",
      },
      {
        cap: "Production still — on location",
        src: "/work/artivive/img-5179.webp",
      },
    ],
    next: "nadi-co",
  },
  {
    slug: "nadi-co",
    name: "Nadi & Co",
    sub: "Social Media Branding",
    role: "Script Writer",
    period: "Feb 2026 — Present",
    scope: "Script Writer, Story Telling",
    tags: [
      "Script Writer",
      "Story Telling",
    ],
    prose: [
      "NADI.Co is a creative collective specializing in brand communication strategy, visual storytelling, and content development. We help businesses and brands craft authentic narratives and distinct visual identities, connecting them effectively with their target audience through strategic conceptualization and compelling copywriting.",
    ],
    sections: [
      {
        label: "WHAT I DO",
        body: [
          "Lead the narrative architecture and verbal identity for NADI.Co’s brand campaigns and creative projects. Responsible for translating brand strategies and client objectives into compelling video scripts, persuasive promotional copy, and engaging visual storytelling designed to resonate with target audiences.",
        ],
      },
    ],
    cover: "/work/nadi-co/nadi-3.webp",
    logo: "/logo/nadi-co.svg",
    gallery: [
      {
        cap: "Editorial photography — series",
        src: "/work/nadi-co/nadi-1.webp",
      },
      {
        cap: "Editorial photography — series",
        src: "/work/nadi-co/nadi-2.webp",
      },
      {
        cap: "Editorial photography — series",
        src: "/work/nadi-co/nadi-4.webp",
      },
      {
        cap: "Editorial photography — series",
        src: "/work/nadi-co/nadi-5.webp",
      },
      {
        cap: "Production still — on location",
        src: "/work/nadi-co/img-5181.webp",
      },
      { cap: "Social feed layout — grid", src: "/work/nadi-co/feed-grid.webp" },
      {
        cap: "Social feed layout — grid",
        src: "/work/nadi-co/feed-grid-2.webp",
      },
      { cap: "Shoot day — behind the scenes", src: "/work/nadi-co/bts-1.webp" },
      { cap: "Shoot day — behind the scenes", src: "/work/nadi-co/bts-2.webp" },
    ],
    next: "artivive",
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
