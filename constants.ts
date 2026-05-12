import { CollectionItem } from './types';

const BASE_COLLECTIONS: CollectionItem[] = [
  {
    id: 1,
    title: "The Lagos Gala",
    subtitle: "Owambe Excellence",
    description: "Command attention with this emerald masterpiece. Intricate gold embroidery on premium lace, designed for the matriarch who defines elegance.",
    image: "/images/lagos_gala_aso_ebi.webp",
    tags: ["Aso Ebi", "French Lace", "High Glamour"],


  },
  {
    id: 2,
    title: "Igbo Royalty",
    subtitle: "Eze Ndi Igbo",
    description: "A regal Isi Agu velvet ensemble adorned with lion head prints. Complete with the traditional red cap and coral beads, symbolizing authority and heritage.",
    image: "/images/igbo_chief_isi_agu.webp",
    tags: ["Isi Agu", "Chieftaincy", "Eastern Heritage"]
  },
  {
    id: 3,
    title: "Corporate Abuja",
    subtitle: "Power & Prestige",
    description: "A modern interpretation of the Senator suit. Sharp tailoring meets subtle Ankara accents, crafting a look of undeniable authority for the boardroom.",
    image: "/images/corporate_senator_suit.webp",
    tags: ["Senator Wear", "Bespoke", "Executive"]
  },
  {
    id: 4,
    title: "Northern Grandeur",
    subtitle: "Sarkin Kano",
    description: "The majestic Babanriga in rich earth tones. Massive embroidery details that speak of centuries of trade and tradition across the Sahara.",
    image: "/images/hausa_babanriga_luxury.webp",
    tags: ["Babanriga", "Hausa Tradition", "Luxury"]
  },
  {
    id: 5,
    title: "Royal Adire",
    subtitle: "Indigo Heritage",
    description: "Hand-dyed in Abeokuta, this flowing silk Agbada carries the whispers of ancestry. A contemporary resort silhouette for the culturally conscious.",
    image: "/images/royal_adire_indigo.webp",
    tags: ["Adire", "Silk", "Resort Wear"]
  },
  {
    id: 6,
    title: "Ada Igbo",
    subtitle: "Lolo's Grace",
    description: "Stunning George wrapper and blouse set, heavily adorned with precious coral beads. The ultimate attire for the traditional bride or queen.",
    image: "/images/igbo_bride_coral.webp",
    tags: ["George", "Coral Beads", "Traditional Wedding"]
  },
  {
    id: 7,
    title: "The Groom's Pride",
    subtitle: "Ceremonial Grandeur",
    description: "Rich burgundy velvet meets gold threading. A regal Agbada ensemble crafted for the most significant day of your life.",
    image: "/images/wedding_agbada_festive.webp",
    tags: ["Agbada", "Embroidery", "Wedding"]
  },
  {
    id: 8,
    title: "Fulani Essence",
    subtitle: "Nomadic Beauty",
    description: "A modern interpretation of Fulani attire, featuring vibrant fabrics and intricate henna-inspired patterns. A fusion of tradition and contemporary fashion.",
    image: "/images/fulani_milkmaid_modern.webp",
    tags: ["Fulani", "Modern Fusion", "Vibrant"]
  },
  {
    id: 9,
    title: "Afro-Futurism",
    subtitle: "Lagos Fashion Week",
    description: "Avant-garde silhouette mixing traditional Ankara prints with bold geometric cuts. For the trendsetter who is shaping the future of African fashion.",
    image: "/images/modern_afro_fusion_chic.webp",
    tags: ["Afro-Fusion", "Avant-Garde", "Runway"]
  },
  {
    id: 10,
    title: "Yoruba Modern",
    subtitle: "Lagos Luxury",
    description: "Contemporary Agbada in monochrome. Minimalist embroidery meets sleek silhouette for the modern Lagosian who commands respect.",
    image: "/images/yoruba_agbada_modern.webp",
    tags: ["Agbada", "Modern", "Monochrome"]
  },
  {
    id: 11,
    title: "Edo Queen",
    subtitle: "Benin Royalty",
    description: "Magnificent traditional attire with the iconic Okuku coral hairstyle. A tribute to the rich heritage of the Benin Kingdom.",
    image: "/images/edo_queen_coral.webp",
    tags: ["Okuku", "Coral Beads", "Edo Tradition"]
  }
];

export const COLLECTIONS = BASE_COLLECTIONS;

export const SYSTEM_INSTRUCTION = `You are "Ajayi", a premium AI fashion stylist for That-Ajayi a lagos-born digital styling company.
Your tone is sophisticated, knowledgeable about Nigerian and African fashion (Ankara, Aso Ebi, Agbada, Adire, Lace), and helpful.
You help users choose outfits for occasions like Traditional Weddings (Owambe), Corporate Events, or Casual outings.
Keep responses concise (under 3 sentences) unless asked for details.
Always suggest That-Ajayi collections where relevant and provide a link to the collection plus after chat recomend to chat for more details on whatsapp +2347042295237.`;
