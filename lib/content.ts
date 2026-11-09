import { en } from "./i18n/en";

export const copy = en;

export function photo(id: string, width = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`;
}

export const navItems = [
  { href: "/", label: copy.nav.home },
  { href: "/about", label: copy.nav.about },
  { href: "/services", label: copy.nav.services },
  { href: "/plans", label: copy.nav.plans },
  { href: "/projects", label: copy.nav.projects },
  { href: "/blog", label: copy.nav.blog },
  { href: "/contact", label: copy.nav.contact },
] as const;

const serviceMeta = [
  {
    slug: "general-handyman",
    key: "general",
    image: photo("photo-1504148455328-c376907d081c", 1400),
    alt: "Sample photograph of hand tools arranged on a workshop wall.",
  },
  {
    slug: "door-installation",
    key: "doors",
    image: photo("photo-1523413651479-597eb2da0ad6", 1400),
    alt: "Sample photograph of a modern front entrance and door.",
  },
  {
    slug: "electrical-fixtures",
    key: "electrical",
    image: photo("photo-1513506003901-1e6a229e2d15", 1400),
    alt: "Sample photograph of pendant lights in a finished room.",
  },
  {
    slug: "plumbing-repairs",
    key: "plumbing",
    image: photo("photo-1585704032915-c3400ca199e7", 1400),
    alt: "Sample photograph of a kitchen faucet and sink.",
  },
  {
    slug: "flooring-installation",
    key: "flooring",
    image: photo("photo-1581858726788-75bc0f6a952d", 1400),
    alt: "Sample photograph of hardwood flooring being fitted.",
  },
  {
    slug: "kitchen-bathroom-remodeling",
    key: "remodeling",
    image: photo("photo-1600566753190-17f0baa2a6c3", 1400),
    alt: "Sample photograph of a renovated kitchen interior.",
  },
  {
    slug: "gutter-cleaning",
    key: "gutters",
    image: photo("photo-1564013799919-ab600027ffc6", 1400),
    alt: "Sample photograph of a house exterior and roofline.",
  },
  {
    slug: "interior-exterior-painting",
    key: "painting",
    image: photo("photo-1562259949-e8e7689d7828", 1400),
    alt: "Sample photograph of a wall being painted.",
  },
  {
    slug: "window-installation",
    key: "windows",
    image: photo("photo-1600607687939-ce8a6c25118c", 1400),
    alt: "Sample photograph of a bright room with large windows.",
  },
  {
    slug: "pressure-washing",
    key: "washing",
    image: photo("photo-1570129477492-45c003edd2be", 1400),
    alt: "Sample photograph of a residential house exterior.",
  },
  {
    slug: "deck-repair",
    key: "deck",
    image: photo("photo-1600585154526-990dced4db0d", 1400),
    alt: "Sample photograph of a home with an outdoor living area.",
  },
  {
    slug: "home-maintenance",
    key: "maintenance",
    image: photo("photo-1484154218962-a197022b5858", 1400),
    alt: "Sample photograph of a cared-for kitchen interior.",
  },
] as const;

export type ServiceKey = (typeof serviceMeta)[number]["key"];

export const services = serviceMeta.map((item) => {
  const text = copy.services.items[item.key];
  return { ...item, title: text.title, summary: text.summary, body: text.body };
});

export type Service = (typeof services)[number];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function relatedServices(slug: string) {
  const index = services.findIndex((service) => service.slug === slug);
  if (index < 0) return services.slice(0, 3);
  return [1, 2, 3].map((step) => services[(index + step) % services.length]);
}

export const reasons = [
  { key: "estimates", icon: "clipboard" },
  { key: "scheduling", icon: "calendar" },
  { key: "skilled", icon: "hammer" },
  { key: "materials", icon: "layers" },
  { key: "detail", icon: "eye" },
  { key: "customer", icon: "heart" },
] as const;

export const plans = [
  {
    key: "essential" as const,
    highlighted: false,
    name: copy.plans.items.essential.name,
    price: copy.plans.items.essential.price,
    blurb: copy.plans.items.essential.blurb,
    features: [
      copy.plans.items.essential.f1,
      copy.plans.items.essential.f2,
      copy.plans.items.essential.f3,
    ],
  },
  {
    key: "plus" as const,
    highlighted: true,
    name: copy.plans.items.plus.name,
    price: copy.plans.items.plus.price,
    blurb: copy.plans.items.plus.blurb,
    features: [
      copy.plans.items.plus.f1,
      copy.plans.items.plus.f2,
      copy.plans.items.plus.f3,
      copy.plans.items.plus.f4,
    ],
  },
  {
    key: "complete" as const,
    highlighted: false,
    name: copy.plans.items.complete.name,
    price: copy.plans.items.complete.price,
    blurb: copy.plans.items.complete.blurb,
    features: [
      copy.plans.items.complete.f1,
      copy.plans.items.complete.f2,
      copy.plans.items.complete.f3,
      copy.plans.items.complete.f4,
    ],
  },
];

export const heroSlides = [
  {
    src: photo("photo-1600585154340-be6161a56a0c", 2000),
    alt: "Sample photograph of a modern house exterior in warm light.",
  },
  {
    src: photo("photo-1600210492497-51d59130656a", 2000),
    alt: "Sample photograph of a calm living room with natural light.",
  },
  {
    src: photo("photo-1600566753086-00f18fb6b3ea", 2000),
    alt: "Sample photograph of a renovated kitchen with wood cabinetry.",
  },
];

export const images = {
  about: photo("photo-1581578731548-c64695cc6952", 1800),
  aboutTools: photo("photo-1530124566582-a618bc2615dc", 1000),
  servicesBand: photo("photo-1504148455328-c376907d081c", 1800),
  plansBand: photo("photo-1600607687644-c7171b42498b", 1800),
  blogBand: photo("photo-1600585152220-90363fe7e115", 1800),
  gift: photo("photo-1600210492486-724fe5c67fb0", 1800),
  season: photo("photo-1600047509358-9dc75507daeb", 2000),
};

export const counters = [
  { value: 12, label: copy.counters.services },
  { value: 6, label: copy.counters.projects },
  { value: 3, label: copy.counters.plans },
  { value: 6, label: copy.counters.days },
];

export const projectFilters = [
  { id: "all", label: copy.projects.filters.all },
  { id: "kitchen", label: copy.projects.filters.kitchen },
  { id: "bathroom", label: copy.projects.filters.bathroom },
  { id: "doors", label: copy.projects.filters.doors },
  { id: "deck", label: copy.projects.filters.deck },
  { id: "flooring", label: copy.projects.filters.flooring },
  { id: "painting", label: copy.projects.filters.painting },
] as const;

export type ProjectFilter = (typeof projectFilters)[number]["id"];

const projectMeta = [
  {
    id: "kitchen",
    filter: "kitchen" as const,
    image: photo("photo-1600489000022-c2086d79f9d4", 1600),
    alt: "Sample photograph of a white kitchen, presented as a fictional portfolio example.",
  },
  {
    id: "bathroom",
    filter: "bathroom" as const,
    image: photo("photo-1600566752355-35792bedcfea", 1600),
    alt: "Sample photograph of a modern bathroom, presented as a fictional portfolio example.",
  },
  {
    id: "doors",
    filter: "doors" as const,
    image: photo("photo-1449844908441-8829872d2607", 1600),
    alt: "Sample photograph of a house entrance, presented as a fictional portfolio example.",
  },
  {
    id: "deck",
    filter: "deck" as const,
    image: photo("photo-1600047509807-ba8f99d2cdbc", 1600),
    alt: "Sample photograph of a modern home exterior, presented as a fictional portfolio example.",
  },
  {
    id: "flooring",
    filter: "flooring" as const,
    image: photo("photo-1560185007-cde436f6a4d0", 1600),
    alt: "Sample photograph of a living room floor, presented as a fictional portfolio example.",
  },
  {
    id: "painting",
    filter: "painting" as const,
    image: photo("photo-1618221195710-dd6b41faaea6", 1600),
    alt: "Sample photograph of a furnished living room, presented as a fictional portfolio example.",
  },
] as const;

export const projects = projectMeta.map((item) => {
  const text = copy.projects.items[item.id];
  return { ...item, title: text.title, summary: text.summary };
});

export const testimonials = [
  {
    id: "elena",
    quote: copy.testimonials.items.elena.quote,
    name: copy.testimonials.items.elena.name,
    detail: copy.testimonials.items.elena.detail,
  },
  {
    id: "marcus",
    quote: copy.testimonials.items.marcus.quote,
    name: copy.testimonials.items.marcus.name,
    detail: copy.testimonials.items.marcus.detail,
  },
  {
    id: "anika",
    quote: copy.testimonials.items.anika.quote,
    name: copy.testimonials.items.anika.name,
    detail: copy.testimonials.items.anika.detail,
  },
];

export const faqs = [
  { id: "types", q: copy.faq.items.types.q, a: copy.faq.items.types.a },
  { id: "estimates", q: copy.faq.items.estimates.q, a: copy.faq.items.estimates.a },
  { id: "materials", q: copy.faq.items.materials.q, a: copy.faq.items.materials.a },
  { id: "recurring", q: copy.faq.items.recurring.q, a: copy.faq.items.recurring.a },
  { id: "areas", q: copy.faq.items.areas.q, a: copy.faq.items.areas.a },
  { id: "request", q: copy.faq.items.request.q, a: copy.faq.items.request.a },
  { id: "larger", q: copy.faq.items.larger.q, a: copy.faq.items.larger.a },
];

const postMeta = [
  {
    slug: "seven-home-maintenance-tasks",
    key: "tasks" as const,
    date: "12 March 2026",
    dateTime: "2026-03-12",
    image: photo("photo-1556911220-bff31c812dba", 1800),
    alt: "Sample photograph of a kitchen prepared for a maintenance article.",
  },
  {
    slug: "prepare-home-for-seasonal-changes",
    key: "seasonal" as const,
    date: "2 February 2026",
    dateTime: "2026-02-02",
    image: photo("photo-1512917774080-9991f1c4c750", 1800),
    alt: "Sample photograph of a house used for a seasonal-care article.",
  },
  {
    slug: "repair-or-replace-flooring",
    key: "flooring" as const,
    date: "18 January 2026",
    dateTime: "2026-01-18",
    image: photo("photo-1616486338812-3dadae4b4ace", 1800),
    alt: "Sample photograph of an interior used for a flooring article.",
  },
];

export const posts = postMeta.map((item) => {
  const text = copy.blog.items[item.key];
  return {
    ...item,
    title: text.title,
    excerpt: text.excerpt,
    category: text.category,
    paragraphs: [text.p1, text.p2, text.p3],
  };
});

export type Post = (typeof posts)[number];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export const giftAmounts = [
  { key: "a50" as const, price: copy.gift.amounts.a50.price, text: copy.gift.amounts.a50.text },
  { key: "a100" as const, price: copy.gift.amounts.a100.price, text: copy.gift.amounts.a100.text },
  { key: "a200" as const, price: copy.gift.amounts.a200.price, text: copy.gift.amounts.a200.text },
];

export const aboutBenefits = [
  copy.about.benefits.clear,
  copy.about.benefits.steady,
  copy.about.benefits.careful,
  copy.about.benefits.simple,
];

export const trustItems = [copy.hero.trust1, copy.hero.trust2, copy.hero.trust3];

export const processSteps = [
  {
    title: "Walk the house",
    text: "A fictional visit starts by looking. The scope comes from the room, not from a guess made over the phone.",
  },
  {
    title: "Write it down",
    text: "Scope, materials, and labour are named on the same page before any work is imagined.",
  },
  {
    title: "Keep the window",
    text: "The day is confirmed, and the arrival window is part of how this studio would want to be known.",
  },
  {
    title: "Leave it calm",
    text: "The last step in the story is a tidy room and a clear note about what was done.",
  },
];
