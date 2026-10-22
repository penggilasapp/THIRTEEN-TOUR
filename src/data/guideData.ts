export interface TravelArticle {
  id: string;
  title: string;
  category: 'Destination Guide' | 'Safety Protocol' | 'Culture & Etiquette' | 'Travel Logistics';
  destinationTag: 'Bromo' | 'Ijen' | 'Bali' | 'Yogyakarta' | 'Overland Java-Bali';
  readingTime: string;
  publishDate: string;
  author: string;
  authorRole: string;
  summary: string;
  contentParagraphs: string[];
  keyTips: string[];
  coverImage: string;
}

export const TRAVEL_ARTICLES_DATA: TravelArticle[] = [
  {
    id: 'guide-ijen-safety-respirator',
    title: 'The Definitive Guide to Mount Ijen: Gas Respirator Protocols & Physical Preparation',
    category: 'Safety Protocol',
    destinationTag: 'Ijen',
    readingTime: '5 Min Read',
    publishDate: '15 October 2026',
    author: 'Bayu Wicaksono',
    authorRole: 'Head of Geological Expedition Safety',
    summary: 'Everything you need to know before descending into the Ijen crater at midnight, from BBKSDA conservation regulations and dual-cartridge respirators to physical health requirements.',
    contentParagraphs: [
      'Mount Ijen is a hyper-active acidic volcano containing the world’s most acidic natural lake (pH < 0.5) and high-temperature sulfur vent fires. To experience both the electric blue flames and the turquoise dawn safely, rigorous adherence to safety standards is paramount.',
      'The trekking ascent from Paltuding basecamp to the crater rim spans 3 kilometers with gradients of 20 to 35 degrees, taking approximately 1.5 to 2 hours of moderate hiking. At the rim, shifting winds can quickly blow dense sulfur vapor directly across the visitor path.',
      'THIRTEEN Operator Tour strictly mandates the use of 3M dual-cartridge acidic vapor gas respirators and sealed protective eyewear. Standard fabric or simple surgical masks are strictly prohibited as they provide zero protection against toxic sulfur dioxide (SO2) gas.'
    ],
    keyTips: [
      'Obtain a valid medical clearance certificate confirming no acute respiratory ailments from the Paltuding health post.',
      'Dress in strategic thermal layers (moisture-wicking base layer, fleece insulation, and an outer windbreaker). Night temperatures can drop to 5°C.',
      'Sturdy hiking boots with deep rugged tread (Vibram or rubber outsole) are mandatory for navigating rocky caldera terrain.',
      'Always follow your certified miner guide; never step beyond marked safety boundary ropes.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'guide-bromo-best-season',
    title: 'Optimal Seasons & Secret Photography Spots for Mount Bromo Sunrise',
    category: 'Destination Guide',
    destinationTag: 'Bromo',
    readingTime: '4 Min Read',
    publishDate: '12 October 2026',
    author: 'Rian Prasetyo',
    authorRole: 'Lead Landscape Photographer & Guide',
    summary: 'A seasonal weather calendar for capturing the golden sea of clouds and the Milky Way over Bromo, comparing King Kong Hill, Love Hill, and Penanjakan viewpoints.',
    contentParagraphs: [
      'Bromo Tengger Semeru National Park features two distinct seasonal patterns that significantly affect visual clarity. The dry season (May through October) offers crystal-clear nighttime skies with an approximate 90% chance of observing the Milky Way galaxy spanning the caldera.',
      'During July and August, night temperatures in Cemoro Lawang often drop to 0°C, producing frost (embun upas). Proper thermal clothing is essential for pre-dawn vantage waits.',
      'For the morning twilight, King Kong Hill provides a dramatically framed perspective with fewer crowds compared to Penanjakan 1. From here, Mount Batok, the smoking Bromo crater, and the majestic peak of Semeru align into an unforgettable photographic composition.'
    ],
    keyTips: [
      'Recommended departure from your lodge is 03:15 AM to secure prime front-row photography platforms.',
      'Equip your camera with a sturdy weighted tripod to resist strong caldera gusts at dawn.',
      'Keep spare camera batteries inside an inner warm coat pocket; cold temperatures drain lithium charge 40% faster.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'guide-temple-etiquette',
    title: 'Sanctuary Etiquette for Borobudur & Sacred Balinese Water Temples',
    category: 'Culture & Etiquette',
    destinationTag: 'Bali',
    readingTime: '4 Min Read',
    publishDate: '08 October 2026',
    author: 'Ni Luh Made Savitri',
    authorRole: 'Balinese Cultural Historian',
    summary: 'Essential dress codes, sacred temple perimeter rules, and UNESCO stone preservation guidelines when visiting ancient places of worship across Java and Bali.',
    contentParagraphs: [
      'Visiting active places of worship in Indonesia requires genuine reverence. At Borobudur, strictly enforced visitor caps and the requirement to wear specialized Upanat woven sandals protect 1,200-year-old volcanic relief panels from abrasion.',
      'In Bali, temples (Pura) are sacred abodes of ancestors and deities. Visitors are required to wear a traditional Kamen sarong and a sash knotted at the waist, symbolizing the grounding of worldly desires before entering divine grounds.',
      'Your private THIRTEEN cultural guide will ensure respectful circumambulation (Pradaksina—clockwise movement) while explaining the profound spiritual symbolism of each carved monument.'
    ],
    keyTips: [
      'Never climb on, sit atop, or touch ancient carved relief stones or stupas with bare sunscreen-covered hands.',
      'Women who are menstruating are respectfully asked by customary law to refrain from entering inner temple sanctums (Jeroan).',
      'Wear clothing that covers shoulders and knees, preferably in modest neutral or clean white tones.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'guide-trans-java-overland',
    title: 'Engineering the Trans-Java Overland Expedition to Bali: Panoramic Rails & Luxury Lodges',
    category: 'Travel Logistics',
    destinationTag: 'Overland Java-Bali',
    readingTime: '6 Min Read',
    publishDate: '02 October 2026',
    author: 'Dian Kusuma',
    authorRole: 'Senior Itinerary Architect',
    summary: 'Why traversing overland from Yogyakarta across Bromo and Ijen to Bali remains the most rewarding way to experience the geographical and cultural diversity of Indonesia.',
    contentParagraphs: [
      'Overland travel is often stereotyped as tiring when relying on generic buses. However, by combining executive panoramic rail carriages through the volcanic emerald valleys of Central Java with private luxury vans and private ferry straits crossings, overland travel becomes a grand land cruise.',
      'The journey’s pacing is thoughtfully engineered with restorative multi-night stays at premier boutique mountain lodges like Plataran Bromo, Dialoog Banyuwangi, and Munduk Moding Plantation, ensuring you remain revitalized throughout.',
      'Our dedicated concierge team coordinates door-to-door luggage handling so you can focus entirely on scenic vistas and local cultural immersion without logistical friction.'
    ],
    keyTips: [
      'The optimal overland duration between Yogyakarta, Bromo, Ijen, and Bali is 6 Days / 5 Nights or 7 Days / 6 Nights.',
      'Carry modest local cash (IDR) for temple donations and purchases from local community artisan workshops.',
      'Pack one pair of comfortable city walking shoes alongside one pair of rugged hiking boots with ankle support.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'
  }
];
