import { Region, Destination } from '../types/tour';

export const REGIONS_DATA: Region[] = [
  {
    id: 'bali',
    name: 'Bali',
    slug: 'bali',
    description: 'An Indonesian island sanctuary renowned for forested volcanic mountains, ancient Hindu water temples, terraced rice paddies, and secluded coastal coves.',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'java',
    name: 'Java',
    slug: 'java',
    description: 'The volcanic and cultural spine of Indonesia, spanning ancient royal capitals, smoking caldera rims, otherworldly sulfur craters, roaring canyon waterfalls, and protected coastal wilderness.',
    heroImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1600&q=80'
  }
];

export const DESTINATIONS_DATA: Destination[] = [
  // ==========================================
  // BALI SUBDESTINATIONS (5)
  // ==========================================
  {
    id: 'dest-canggu',
    regionId: 'bali',
    name: 'Canggu',
    slug: 'canggu',
    shortDescription: 'Vibrant coastal enclave celebrated for black-sand surf breaks, bohemian beach clubs, artisanal coffee culture, and sunset ocean vistas.',
    longDescription: 'Canggu blends authentic Balinese coastal village rhythm with contemporary lifestyle aesthetics. Situated along Bali’s southwest shoreline, it offers rolling surf breaks at Echo Beach and Batu Bolong, verdant pocket rice terraces, serene wellness sanctuaries, and vibrant sunset pavilions.',
    heroImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    ],
    experiences: [
      'Echo Beach sunset relaxation & coastal walking',
      'Private surf coaching on gentle black-sand breaks',
      'Artisanal wellness & farm-to-table culinary masterclasses'
    ],
    practicalInformation: 'Best visited May through October for dry, sunny weather. Approximately 60–90 minutes by private chauffeur from Ngurah Rai International Airport (DPS).',
    seoTitle: 'Canggu Private Travel & Guided Expeditions | THIRTEEN',
    seoDescription: 'Explore Canggu with THIRTEEN: private coastal transfers, boutique villa retreats, surf coaching, and authentic Balinese culinary experiences.',
    isPublished: true,
    tagline: 'Black-sand surf breaks, coastal cafes & relaxed coastal retreats',
    description: 'Vibrant coastal enclave celebrated for black-sand surf breaks, bohemian beach clubs, artisanal coffee culture, and sunset ocean vistas.',
    highlights: [
      'Echo Beach sunset relaxation & coastal walking',
      'Private surf coaching on gentle black-sand breaks',
      'Artisanal wellness & farm-to-table culinary masterclasses'
    ],
    climateSafetyNotes: 'Warm tropical maritime climate (27°C–31°C). Ocean currents require attentiveness when swimming.',
    status: 'core',
    statusLabel: 'Approved Subdestination',
    heroBadge: 'Coastal & Surf'
  },
  {
    id: 'dest-pecatu',
    regionId: 'bali',
    name: 'Pecatu',
    slug: 'pecatu',
    shortDescription: 'Dramatic limestone cliffs and world-class clifftop pavilions overlooking the sapphire waters of the Bukit Peninsula and sacred Uluwatu.',
    longDescription: 'Perched atop the rugged limestone cliffs of Bali’s southern Bukit Peninsula, Pecatu is home to sacred Pura Luhur Uluwatu, iconic amphitheaters featuring the Kecak Fire Dance at dusk, secluded turquoise beaches including Padang Padang and Bingin, and secluded luxury clifftop pool villas.',
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
    ],
    experiences: [
      'VIP front-row Uluwatu clifftop temple & Kecak fire dance',
      'Hidden white-sand cove explorations at Padang Padang and Bingin',
      'Private sunset yacht charter along Bukit limestone cliffs'
    ],
    practicalInformation: 'Located 45 minutes south of DPS Airport. Cliffside walkways require careful footstep discipline; protective sarongs are mandatory inside Uluwatu temple perimeters.',
    seoTitle: 'Pecatu & Uluwatu Clifftop Expeditions | THIRTEEN',
    seoDescription: 'Bespoke clifftop journeys in Pecatu and Uluwatu. Private Kecak performances, luxury villas, and secluded limestone beach coves.',
    isPublished: true,
    tagline: 'Towering ocean limestone cliffs & sacred clifftop temples',
    description: 'Dramatic limestone cliffs and world-class clifftop pavilions overlooking the sapphire waters of the Bukit Peninsula and sacred Uluwatu.',
    highlights: [
      'VIP front-row Uluwatu clifftop temple & Kecak fire dance',
      'Hidden white-sand cove explorations at Padang Padang and Bingin',
      'Private sunset yacht charter along Bukit limestone cliffs'
    ],
    climateSafetyNotes: 'Breezy coastal cliff climate. Sturdy footwear recommended on limestone paths.',
    status: 'core',
    statusLabel: 'Approved Subdestination',
    heroBadge: 'Clifftop & Ocean'
  },
  {
    id: 'dest-ubud',
    regionId: 'bali',
    name: 'Ubud',
    slug: 'ubud',
    shortDescription: 'The cultural and spiritual heart of Bali, immersed in sacred river ravines, ancient royal palaces, and emerald rice terrace ridges.',
    longDescription: 'Nestled in the lush central uplands, Ubud has long been the epicentre of Balinese arts, master woodcarving, traditional painting, and holistic healing. Surrounded by the Ayung River gorge, Campuhan Ridge, and centuries-old subak irrigation waterways, Ubud provides secluded private villa retreats and meaningful cultural exchanges.',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    experiences: [
      'Private Melukat water blessing ceremony with an authentic high priest',
      'Ayung River gorge luxury valley walk & Campuhan Ridge morning stroll',
      'Private master woodcarver and silver atelier visits in Celuk & Mas'
    ],
    practicalInformation: 'Elevated upland climate (22°C–28°C), cooler in evening. 75 minutes from DPS Airport. Modest attire required when visiting village temples.',
    seoTitle: 'Ubud Cultural Sanctuaries & Bespoke Retreats | THIRTEEN',
    seoDescription: 'Experience Ubud with THIRTEEN: private valley villas, Melukat spiritual water blessings, sacred river gorges, and master artisan ateliers.',
    isPublished: true,
    tagline: 'Artisanal culture, sacred temples & untouched highland cascades',
    description: 'The cultural and spiritual heart of Bali, immersed in sacred river ravines, ancient royal palaces, and emerald rice terrace ridges.',
    highlights: [
      'Private Melukat water blessing ceremony with an authentic high priest',
      'Ayung River gorge luxury valley walk & Campuhan Ridge morning stroll',
      'Private master woodcarver and silver atelier visits in Celuk & Mas'
    ],
    climateSafetyNotes: 'Pleasant upland temperatures year-round. Light rain layers advised for tropical forest walks.',
    status: 'core',
    statusLabel: 'Approved Subdestination',
    heroBadge: 'Cultural Heart'
  },
  {
    id: 'dest-kintamani',
    regionId: 'bali',
    name: 'Kintamani',
    slug: 'kintamani',
    shortDescription: 'High-altitude volcanic caldera panoramic vistas, sacred Lake Batur, and ancient Arabica coffee plantation highlands.',
    longDescription: 'Perched 1,500 meters above sea level on the rim of Mount Batur’s ancient caldera, Kintamani commands sweeping views of Mount Batur’s active black-lava flows and the crescent-shaped Lake Batur. The highland terroir produces Bali’s renowned single-origin Arabica coffee, nurtured by mineral-rich volcanic soil and cool mountain mist.',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
    ],
    experiences: [
      'Sunrise panoramic coffee tasting overlooking Batur crater',
      'Private lakeside traditional wooden canoe crossing to ancient Trunyan',
      'Private 4x4 black-lava geological trail expedition'
    ],
    practicalInformation: 'Cool alpine weather (15°C–22°C). Light fleece or windbreaker recommended. 2 hours north from Denpasar or 1 hour from Ubud.',
    seoTitle: 'Kintamani Volcanic Caldera & Highland Expeditions | THIRTEEN',
    seoDescription: 'Witness Mount Batur and Lake Batur in Kintamani. High-altitude coffee plantations, private 4x4 black-lava excursions, and traditional lakeside culture.',
    isPublished: true,
    tagline: 'Volcanic caldera vistas, sacred crater lakes & mountain coffee',
    description: 'High-altitude volcanic caldera panoramic vistas, sacred Lake Batur, and ancient Arabica coffee plantation highlands.',
    highlights: [
      'Sunrise panoramic coffee tasting overlooking Batur crater',
      'Private lakeside traditional wooden canoe crossing to ancient Trunyan',
      'Private 4x4 black-lava geological trail expedition'
    ],
    climateSafetyNotes: 'Cool mountain air (15°C–22°C). Warm layer recommended for early morning visits.',
    status: 'core',
    statusLabel: 'Approved Subdestination',
    heroBadge: 'Volcanic Highlands'
  },
  {
    id: 'dest-nusa-penida',
    regionId: 'bali',
    name: 'Nusa Penida',
    slug: 'nusa-penida',
    shortDescription: 'Wild limestone sea cliffs, prehistoric T-Rex rock formations at Kelingking, and pristine marine sanctuaries with resident manta rays.',
    longDescription: 'Separated from mainland Bali by the deep Badung Strait, Nusa Penida is an unspoiled island sanctuary defined by towering coastal cliffs, turquoise coves, and world-renowned marine biodiversity. From the dramatic T-Rex crest of Kelingking to the crystal bay waters of Broken Beach and Angel’s Billabong, private expeditions explore this rugged paradise by private speedboat and dedicated 4x4 vehicles.',
    heroImage: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    ],
    experiences: [
      'Private yacht or speedboat crossing from Sanur harbour',
      'Kelingking T-Rex cliff viewpoint & Diamond Beach staircase',
      'Private chartered snorkeling with resident oceanic manta rays'
    ],
    practicalInformation: 'Speedboat crossing takes 40 minutes from Sanur. Island road terrain is winding and rugged; all THIRTEEN tours utilize dedicated private high-clearance vehicles.',
    seoTitle: 'Nusa Penida Island & Manta Ray Expeditions | THIRTEEN',
    seoDescription: 'Discover Nusa Penida with THIRTEEN: private speedboat charters, Kelingking cliff views, Diamond Beach, and private snorkeling with oceanic manta rays.',
    isPublished: true,
    tagline: 'Prehistoric coastal sea cliffs, turquoise lagoons & manta rays',
    description: 'Wild limestone sea cliffs, prehistoric T-Rex rock formations at Kelingking, and pristine marine sanctuaries with resident manta rays.',
    highlights: [
      'Private yacht or speedboat crossing from Sanur harbour',
      'Kelingking T-Rex cliff viewpoint & Diamond Beach staircase',
      'Private chartered snorkeling with resident oceanic manta rays'
    ],
    climateSafetyNotes: 'Sunny coastal weather. Sun protection, non-slip sandals, and hydration essential.',
    status: 'core',
    statusLabel: 'Approved Subdestination',
    heroBadge: 'Island Wilderness'
  },

  // ==========================================
  // JAVA APPROVED DESTINATIONS (7)
  // ==========================================
  {
    id: 'dest-bromo',
    regionId: 'java',
    name: 'Mount Bromo',
    slug: 'mount-bromo',
    shortDescription: 'Lunar volcanic caldera sunrise, private 4x4 sea-of-sand expeditions, and active steaming crater rim ascents.',
    longDescription: 'Set within the massive Tengger caldera of East Java, Mount Bromo is one of Indonesia’s most revered geological wonders. Rising from a vast sea of volcanic sand at 2,329 meters, the smoking caldera is framed by the iconic conical silhouette of Mount Batok and the distant ash eruptions of Mount Semeru. Private expeditions feature pre-dawn 4x4 Land Cruiser ascents to King Kong Hill and horseback caldera crossings.',
    heroImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    experiences: [
      'King Kong Hill private sunrise vantage and caldera vista',
      'Private 4x4 Land Cruiser expedition across the Sea of Sand',
      'Crater rim staircase climb (250 steps) to active volcanic vent',
      'Madakaripura canyon eternal waterfall trek'
    ],
    practicalInformation: 'Pre-dawn temperatures drop to 3°C–10°C. Heavy fleece, windbreaker, gloves, and sturdy tread shoes mandatory. 3–4 hours by executive private chauffeur from Surabaya or Malang.',
    seoTitle: 'Mount Bromo Private Expeditions & Sunrise Tours | THIRTEEN',
    seoDescription: 'Experience Mount Bromo with THIRTEEN: private 4x4 Toyota Land Cruisers, King Kong Hill sunrise platforms, caldera walks, and luxury mountain lodges.',
    isPublished: true,
    tagline: 'Lunar volcanic caldera sunrise & private 4x4 sea-of-sand expeditions',
    description: 'Witness the sunrise over the ancient Tengger caldera from secluded vantage points away from tourist hordes, followed by a private 4x4 expedition across the whispering volcanic sands.',
    highlights: [
      'King Kong Hill & Penanjakan private sunrise vantage points',
      'Dedicated 4x4 Tengger Land Cruiser driver with local heritage insight',
      'Trek to the smoking volcanic crater rim with certified mountain guide',
      'Stargazing over the mystical caldera under pristine high-altitude skies'
    ],
    climateSafetyNotes: 'High-altitude cold (3°C to 12°C at pre-dawn). Thermal layers, windbreakers, and sturdy footwear mandatory.',
    status: 'core',
    statusLabel: 'Approved Primary Destination',
    heroBadge: 'Volcanic Marvel'
  },
  {
    id: 'dest-ijen',
    regionId: 'java',
    name: 'Ijen Crater',
    slug: 'ijen-crater',
    shortDescription: 'Rare electric-blue flame nocturnal trekking, turquoise acidic caldera lake, and historical sulfur miner trails.',
    longDescription: 'Perched at 2,386 meters in East Java’s Ijen volcano complex, Kawah Ijen holds the world’s largest highly acidic crater lake (pH < 0.5) and one of only two natural electric-blue fire phenomena on the planet. Guided by veteran miner guides equipped with certified chemical gas respirators, travelers undertake a midnight alpine ascent under starlit skies before watching the morning sun illuminate the turquoise waters.',
    heroImage: 'https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
    ],
    experiences: [
      'Midnight alpine crater ascent with certified miner guides',
      'Electric-blue sulfuric fire observation (subject to geological safety clearances)',
      'Panoramic dawn over the 1km-wide turquoise acidic lake',
      'Historic East Java highland coffee plantation overland transit'
    ],
    practicalInformation: 'Health check required prior to midnight ascent. Industrial 3M gas respirators provided. Unsuitable for severe respiratory or cardiac conditions. 1.5 hours from Banyuwangi or 4 hours from Bromo.',
    seoTitle: 'Ijen Crater Blue Flame & Acidic Lake Expeditions | THIRTEEN',
    seoDescription: 'Witness the rare midnight blue fire and turquoise acidic lake at Ijen Crater. Guided by certified alpine miners with professional military-grade respirators.',
    isPublished: true,
    tagline: 'Rare electric-blue flame crater trekking & turquoise acidic caldera',
    description: 'A midnight alpine ascent leading into the otherworldly crater basin. Subject to strict volcanic safety protocols, gas-mask inspections, and daily geological verification before departure.',
    highlights: [
      'Midnight guided crater rim trek led by certified local alpine miners',
      'Mesmerizing natural electric-blue flames (conditioned on safety clearances)',
      'Panoramic sunrise overlooking the world’s largest acidic turquoise lake',
      'Comprehensive safety gear including industrial gas respirators and headlamps'
    ],
    climateSafetyNotes: 'STRICT PROTOCOL: Subject to Center for Volcanology alert levels. Pre-trek health check required. Not suitable for travelers with severe respiratory or heart conditions.',
    status: 'core',
    statusLabel: 'Approved Primary Destination',
    heroBadge: 'Geological Wonder'
  },
  {
    id: 'dest-yogyakarta',
    regionId: 'java',
    name: 'Yogyakarta',
    slug: 'yogyakarta',
    shortDescription: 'Sultanate royal heritage, ninth-century UNESCO stone temples at Borobudur and Prambanan, and subterranean karst marvels.',
    longDescription: 'The cultural heart of the island of Java, Yogyakarta is an active royal sultanate steeped in centuries of artistic, architectural, and spiritual heritage. Marvel at the 1,200-year-old Buddhist monument of Borobudur and the towering 9th-century Hindu spires of Prambanan, descend 60 meters into Jomblang Cave’s heavenly light beam, and explore active Merapi lava trails by open-top 4x4.',
    heroImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80'
    ],
    experiences: [
      'Exclusive Borobudur monument sunrise reflection with archaeologist',
      'Prambanan temple complex & VIP Ramayana ballet performance',
      'Jomblang Cave 60m vertical rappel into prehistoric subterranean forest',
      'Mount Merapi volcanic lava trail 4x4 off-road expedition'
    ],
    practicalInformation: 'Served directly by Yogyakarta International Airport (YIA) with rapid rail connections to city centre. Modest attire required at royal palaces and sacred temple complexes.',
    seoTitle: 'Yogyakarta & Borobudur Heritage Expeditions | THIRTEEN',
    seoDescription: 'Private cultural journeys in Yogyakarta: VIP Borobudur sunrise passes, Prambanan spires, Jomblang Cave vertical descents, and royal Sultanate heritage.',
    isPublished: true,
    tagline: 'Sultanate royal heritage, ninth-century stone temples & mystical karst caves',
    description: 'The soul of Javanese civilization. Explore UNESCO World Heritage marvels Borobudur and Prambanan with master historians, descend into Jomblang’s heavenly light shaft, and savor royal court cuisine.',
    highlights: [
      'Private sunrise entry to sacred Borobudur temple grounds with art historian',
      'Prambanan Hindu temple complex and evening Ramayana ballet VIP gallery',
      'Spelunking descent into Jomblang Cave with certified vertical caving rig',
      'Exclusive private batik masterclass and royal Mataram culinary dinner'
    ],
    climateSafetyNotes: 'Warm tropical inland climate. Moderate walking on historic stone steps. Suitable for all mobility levels.',
    status: 'core',
    statusLabel: 'Approved Primary Destination',
    heroBadge: 'UNESCO Heritage'
  },
  {
    id: 'dest-pulau-merah',
    regionId: 'java',
    name: 'Pulau Merah',
    slug: 'pulau-merah',
    shortDescription: 'Red Island beach sanctuary in Banyuwangi, celebrated for its iconic offshore islet, gentle surf breaks, and fiery golden sunsets.',
    longDescription: 'Located on the pristine southern coastline of Banyuwangi, East Java, Pulau Merah (Red Island) is named for its distinctive 200-meter-high conical offshore island with reddish soil, accessible by foot during low tide. Blessed with clean, uncrowded sand, gentle consistent waves ideal for private surf coaching, and dramatic evening skies, it offers a peaceful coastal complement to East Java’s volcano treks.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    ],
    experiences: [
      'Low-tide walking crossing to the iconic Red Island islet',
      'Private coaching and longboarding on uncrowded south-coast swells',
      'Sunset beachside dining with freshly caught local seafood and coconuts'
    ],
    practicalInformation: 'Located 2.5 hours southwest of Banyuwangi city center or Ketapang Ferry port. Comfortable executive air-conditioned vehicle transfers provided.',
    seoTitle: 'Pulau Merah Red Island Beach Expeditions | THIRTEEN',
    seoDescription: 'Discover Pulau Merah (Red Island) in Banyuwangi: uncrowded coastal surf, low-tide islet crossings, and radiant Indian Ocean sunsets.',
    isPublished: true,
    tagline: 'Conical reddish offshore islet, uncrowded surf & golden sunsets',
    description: 'Red Island beach sanctuary in Banyuwangi, celebrated for its iconic offshore islet, gentle surf breaks, and fiery golden sunsets.',
    highlights: [
      'Low-tide walking crossing to the iconic Red Island islet',
      'Private coaching and longboarding on uncrowded south-coast swells',
      'Sunset beachside dining with freshly caught local seafood and coconuts'
    ],
    climateSafetyNotes: 'Pleasant coastal climate. Low-tide walks require non-slip reef footwear.',
    status: 'core',
    statusLabel: 'Approved Primary Destination',
    heroBadge: 'Coastal Sanctuary'
  },
  {
    id: 'dest-tumpak-sewu',
    regionId: 'java',
    name: 'Tumpak Sewu Waterfall',
    slug: 'tumpak-sewu',
    shortDescription: 'A magnificent thousand-stream circular waterfall curtain cascading 120 meters into a lush jungle ravine beneath Mount Semeru.',
    longDescription: 'Widely celebrated as one of the most breathtaking natural wonders in Southeast Asia, Tumpak Sewu (meaning "A Thousand Waterfalls" in Javanese) forms an immense semi-circular curtain of water pouring 120 meters over sheer moss-covered canyon walls. Set against the majestic background of Mount Semeru, private expeditions guide travelers along panoramic cliffside decks and down into the misty ravine basin to visit Goa Tetes cave springs.',
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80'
    ],
    experiences: [
      'Panoramic upper observation deck sunrise view with Mount Semeru backdrop',
      'Guided canyon descent with waterproof gear to the waterfall amphitheater',
      'Exploration of Goa Tetes natural sulfur cave springs and cascading limestone pools'
    ],
    practicalInformation: 'Located in Pronojiwo, Lumajang, approximately 2 hours south of Malang or 3 hours from Bromo. Sturdy waterproof footwear with rubber grip is essential for canyon stairs.',
    seoTitle: 'Tumpak Sewu Waterfall Guided Expeditions | THIRTEEN',
    seoDescription: 'Witness the 120-meter curtain of Tumpak Sewu Waterfall under Mount Semeru. Private canyon descents, Goa Tetes cave springs, and scenic photography.',
    isPublished: true,
    tagline: 'A thousand-stream circular waterfall curtain in an ancient canyon',
    description: 'A magnificent thousand-stream circular waterfall curtain cascading 120 meters into a lush jungle ravine beneath Mount Semeru.',
    highlights: [
      'Panoramic upper observation deck sunrise view with Mount Semeru backdrop',
      'Guided canyon descent with waterproof gear to the waterfall amphitheater',
      'Exploration of Goa Tetes natural sulfur cave springs and cascading limestone pools'
    ],
    climateSafetyNotes: 'Canyon descent involves wet bamboo stairways. High-traction water shoes and waterproof bags mandatory.',
    status: 'core',
    statusLabel: 'Approved Primary Destination',
    heroBadge: 'Canyon Waterfall'
  },
  {
    id: 'dest-meru-betiri',
    regionId: 'java',
    name: 'Meru Betiri National Park',
    slug: 'meru-betiri',
    shortDescription: 'Untamed coastal rainforest wilderness, sea turtle conservation sanctuaries at Sukamade, and secluded green coves.',
    longDescription: 'Encompassing over 580 square kilometers of primary coastal rainforest, mangrove swamps, and pristine beaches in southern East Java, Meru Betiri National Park is an extraordinary haven of biodiversity. The secluded beach of Sukamade is a protected nesting sanctuary where endangered giant green sea turtles haul ashore by night under the stars to lay eggs. Private expeditions utilize rugged 4x4 vehicles across riverbeds and dense forest trails.',
    heroImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80'
    ],
    experiences: [
      'Nocturnal beach patrol with rangers to observe nesting giant sea turtles',
      'Morning release of sea turtle hatchlings into the protected ocean waters',
      'Rugged 4x4 off-road riverbed crossing through dense coastal rainforest',
      'Green Bay (Teluk Hijau) secluded emerald cove trek'
    ],
    practicalInformation: 'Remote wilderness terrain requires high-clearance 4x4 vehicles. Basic eco-lodge facilities at Sukamade conservation station. 3.5 hours from Banyuwangi.',
    seoTitle: 'Meru Betiri National Park & Sukamade Turtle Sanctuary | THIRTEEN',
    seoDescription: 'Journey deep into Meru Betiri National Park: Sukamade sea turtle nesting night patrols, Green Bay trekking, and private 4x4 rainforest expeditions.',
    isPublished: true,
    tagline: 'Untamed coastal rainforest & nocturnal sea turtle nesting sanctuary',
    description: 'Untamed coastal rainforest wilderness, sea turtle conservation sanctuaries at Sukamade, and secluded green coves.',
    highlights: [
      'Nocturnal beach patrol with rangers to observe nesting giant sea turtles',
      'Morning release of sea turtle hatchlings into the protected ocean waters',
      'Rugged 4x4 off-road riverbed crossing through dense coastal rainforest',
      'Green Bay (Teluk Hijau) secluded emerald cove trek'
    ],
    climateSafetyNotes: 'Wilderness tropical forest. Insect repellant, flashlight, and eco-friendly behavior strictly mandated.',
    status: 'core',
    statusLabel: 'Approved Primary Destination',
    heroBadge: 'Wildlife Sanctuary'
  },
  {
    id: 'dest-baluran',
    regionId: 'java',
    name: 'Baluran National Park',
    slug: 'baluran',
    shortDescription: 'The "Africa of Java": sweeping dry savannah plains, wild water buffalo, Javanese deer, and serene Bama coral beaches.',
    longDescription: 'Dominating the northeastern tip of East Java across from Bali, Baluran National Park is often referred to as "Little Africa in Java" due to its sweeping Bekol savannah plains against the dramatic backdrop of extinct Mount Baluran. Here, wildlife thrives in their natural habitat, including wild banteng (Javanese wild ox), deer, peacocks, ebony leaf monkeys, and over 150 species of birds, culminating in the calm mangrove shores of Bama Beach.',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    experiences: [
      'Savannah wildlife safari in open 4x4 vehicle through Bekol plain',
      'Observation tower photography over watering holes and grazing banteng herds',
      'Mangrove forest nature trail and quiet snorkeling at Bama coral beach'
    ],
    practicalInformation: 'Located 1 hour north of Banyuwangi and Ketapang Ferry port. Dry season (May to October) is ideal for wildlife viewing. Sun protection and binoculars recommended.',
    seoTitle: 'Baluran National Park Safari & Savannah Expeditions | THIRTEEN',
    seoDescription: 'Explore Baluran National Park with THIRTEEN: private open 4x4 savannah safaris, wild banteng herds, Bekol watchtowers, and peaceful Bama coral shores.',
    isPublished: true,
    tagline: 'Sweeping dry savannah plains, native wildlife & Bama coral beaches',
    description: 'The "Africa of Java": sweeping dry savannah plains, wild water buffalo, Javanese deer, and serene Bama coral beaches.',
    highlights: [
      'Savannah wildlife safari in open 4x4 vehicle through Bekol plain',
      'Observation tower photography over watering holes and grazing banteng herds',
      'Mangrove forest nature trail and quiet snorkeling at Bama coral beach'
    ],
    climateSafetyNotes: 'Hot, dry savannah conditions during daylight hours. Wide-brim sun hat and ample hydration advised.',
    status: 'core',
    statusLabel: 'Approved Primary Destination',
    heroBadge: 'Savannah Safari'
  }
];
