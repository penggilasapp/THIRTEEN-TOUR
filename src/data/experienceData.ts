export interface ExperienceItem {
  id: string;
  category: 'nature' | 'culture' | 'adventure';
  categoryLabel: string;
  title: string;
  tagline: string;
  destination: string;
  destinationId: string;
  duration: string;
  fitnessRating: 'Gentle' | 'Moderate' | 'Active Adventurous';
  description: string;
  keyHighlights: string[];
  safetyAndGear: string;
  coverImage: string;
  badge?: string;
}

export const EXPERIENCES_DATA: ExperienceItem[] = [
  // NATURE
  {
    id: 'exp-bromo-sunrise',
    category: 'nature',
    categoryLabel: 'Nature',
    title: 'Caldera Sunrise & Tengger Sea of Sand',
    tagline: 'Magical dawn at King Kong Hill and ancient volcanic savannah crossings',
    destination: 'Mount Bromo, East Java',
    destinationId: 'dest-bromo',
    duration: '6 - 7 Hours',
    fitnessRating: 'Moderate',
    description: 'Witness the morning sun pierce the mist of the Tengger caldera against the silhouette of Mount Batok and the ash plumes of Mount Semeru. Followed by a private 4x4 traverse across the whispering sea of sand toward the active crater rim.',
    keyHighlights: [
      'Private 4x4 Toyota Land Cruiser access to exclusive vantage platforms',
      'Artisan hot Tengger mountain coffee picnic during sunrise',
      'Bromo crater rim climb and historic Poten Temple exploration'
    ],
    safetyAndGear: 'Complimentary windproof thermal jackets, volcanic particulate respirators, and TNBTS-licensed mountain drivers.',
    coverImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    badge: 'Signature Highlight'
  },
  {
    id: 'exp-ijen-turquoise',
    category: 'nature',
    categoryLabel: 'Nature',
    title: 'World’s Largest Acidic Crater Lake at Mount Ijen',
    tagline: 'A 1-kilometer turquoise volcanic lake framed by majestic solfatara cliffs',
    destination: 'Mount Ijen, Banyuwangi',
    destinationId: 'dest-ijen',
    duration: '7 - 8 Hours',
    fitnessRating: 'Active Adventurous',
    description: 'As twilight gives way to sunrise, billowing plumes of sulfur vapor mingle with the deep turquoise waters of the crater lake (pH < 0.5). A raw geological spectacle atop East Java’s highest caldera rim.',
    keyHighlights: [
      'Dramatic panoramic sunrise view from the 2,386-meter crater rim',
      'Insightful interactions with traditional sulfur artisan miners',
      'Rare highland flora including mountain casuarina and Javanese edelweiss'
    ],
    safetyAndGear: 'Military-grade dual-cartridge gas respirators, high-lumen headlamps, and BBKSDA-certified mountain guides.',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    badge: 'Geological Wonder'
  },
  {
    id: 'exp-munduk-cascades',
    category: 'nature',
    categoryLabel: 'Nature',
    title: 'Hidden Waterfalls of Munduk & Sekumpul Ravine',
    tagline: 'Lush tropical valleys, wild clove plantations & thunderous sacred waters',
    destination: 'Munduk & Singaraja, Bali',
    destinationId: 'dest-bali',
    duration: 'Full Day (8 Hours)',
    fitnessRating: 'Moderate',
    description: 'Trek beneath North Bali’s dense rainforest canopy to the majestic twin cascades of Sekumpul and the mystical canyon pools of Banyumala. Rejuvenate in crystalline volcanic waters far from mass tourism trails.',
    keyHighlights: [
      'Private botanical guide deciphering native rainforest herbs and flora',
      'Swimming in secluded natural mountain spring pools',
      'Tasting stop at an organic highland Arabica coffee plantation'
    ],
    safetyAndGear: 'Experienced river crossing guides, waterproof dry bags, and handcrafted trekking poles.',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    badge: 'Secluded Sanctuary'
  },

  // CULTURE
  {
    id: 'exp-borobudur-dawn',
    category: 'culture',
    categoryLabel: 'Culture',
    title: 'Spiritual Dawn Reflection at Borobudur & Prambanan',
    tagline: 'Unveil 1,200-year-old stone reliefs with a senior archaeologist guide',
    destination: 'Magelang & Yogyakarta',
    destinationId: 'dest-yogyakarta',
    duration: 'Full Day (9 Hours)',
    fitnessRating: 'Gentle',
    description: 'Enter the world’s largest Buddhist sanctuary as morning mist wraps the Menoreh hills. Accompanied by a licensed heritage curator to decipher the intricate Karmawibhangga stone panels and the path to Nirvana.',
    keyHighlights: [
      'Special monument monument structure pass with licensed archaeological guide',
      'Gourmet champagne breakfast overlooking the Magelang palm valleys',
      'Twilight exploration of the towering 9th-century Prambanan Hindu spires'
    ],
    safetyAndGear: 'Custom heritage-preserving Upanat stone sandals and sun parasols.',
    coverImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
    badge: 'UNESCO Heritage'
  },
  {
    id: 'exp-bali-melukat',
    category: 'culture',
    categoryLabel: 'Culture',
    title: 'Sacred Melukat Water Cleansing & Spiritual Purification',
    tagline: 'Ancient Balinese spring purification guided by an authentic Pemangku priest',
    destination: 'Ubud & Tampaksiring, Bali',
    destinationId: 'dest-bali',
    duration: '4 Hours',
    fitnessRating: 'Gentle',
    description: 'Immerse yourself in Balinese Hindu Dharma tradition. Experience the tranquil cleansing power of sacred volcanic springs, bringing inner peace and spiritual equilibrium in a private forest sanctuary.',
    keyHighlights: [
      'Personal instruction on prayer rituals and Tri Hita Karana philosophy',
      'Complete handcrafted Canang Sari offerings and ceremonial Kamen sarongs',
      'Private philosophical dialogue with village temple elders'
    ],
    safetyAndGear: 'Clean ceremonial temple attire, changing suites, and private ritual offerings.',
    coverImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    badge: 'Spiritual Immersion'
  },
  {
    id: 'exp-jogja-royal-court',
    category: 'culture',
    categoryLabel: 'Culture',
    title: 'Kotagede Hand-Drawn Batik Atelier & Royal Court Banquet',
    tagline: 'Hot-wax Canting artistry and heirloom recipes of the Sultanate',
    destination: 'Yogyakarta City Center',
    destinationId: 'dest-yogyakarta',
    duration: '5 Hours',
    fitnessRating: 'Gentle',
    description: 'Visit a celebrated 3rd-generation master batik studio in historic Kotagede. Learn traditional hot-wax canting techniques to produce your own keepsake, followed by a private 5-course banquet with royal heirloom dishes.',
    keyHighlights: [
      'Create your own signed hand-drawn batik silk keepsake',
      'Walk through ancient 16th-century Mataram architectural labyrinths',
      'Exclusive 5-course royal dinner accompanied by live acoustic Javanese Gamelan'
    ],
    safetyAndGear: 'All master batik tools, protective aprons, and master artisan instruction.',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    badge: 'Royal Heritage'
  },

  // ADVENTURE
  {
    id: 'exp-ijen-blue-fire',
    category: 'adventure',
    categoryLabel: 'Adventure',
    title: 'Midnight Crater Descent to the Rare Electric Blue Fire',
    tagline: 'One of only two places on Earth: electric blue sulfuric flames in the night',
    destination: 'Mount Ijen, Banyuwangi',
    destinationId: 'dest-ijen',
    duration: 'Midnight to Dawn (00:30 - 06:30)',
    fitnessRating: 'Active Adventurous',
    description: 'Depart from Paltuding basecamp under a blanket of stars. Ascend 450 meters in altitude, then carefully descend into the caldera basin with chemical respirators to witness mesmerizing 600°C blue flames igniting upon contact with air.',
    keyHighlights: [
      'Private ratio of 1 certified miner guide for every 4 guests',
      'Pre-trek health check and blood oxygen level verification',
      'Spectacular transition from midnight flames to turquoise dawn vista'
    ],
    safetyAndGear: 'Mandatory 3M dual-cartridge acidic gas respirators, sealed eye goggles, 400-lumen headlamps, and emergency portable oxygen.',
    coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    badge: 'Bucket List Extreme'
  },
  {
    id: 'exp-jomblang-light',
    category: 'adventure',
    categoryLabel: 'Adventure',
    title: 'Single Rope Caving & The Heavenly Ray of Light at Jomblang',
    tagline: 'Vertical 60-meter rappel into an ancient subterranean rainforest sinkhole',
    destination: 'Gunungkidul, Yogyakarta',
    destinationId: 'dest-yogyakarta',
    duration: '6 Hours',
    fitnessRating: 'Active Adventurous',
    description: 'Descend 60 meters via Single Rope Technique (SRT) into a prehistoric collapsed doline. Trek 300 meters through underground tunnels toward Grubug Cave as midday sunlight strikes through the ceiling in an ethereal beam.',
    keyHighlights: [
      'Professional 60m vertical descent managed by SAR-certified caving experts',
      'Prehistoric flora flourishing in the isolated underground sinkhole',
      'Legendary "Ray of Light" shaft perfect for breathtaking photography'
    ],
    safetyAndGear: 'UIAA-certified harnesses, impact-resistant speleology helmets, and rugged mud boots.',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    badge: 'Underground Expedition'
  },
  {
    id: 'exp-merapi-lava-tour',
    category: 'adventure',
    categoryLabel: 'Adventure',
    title: 'Open-Top 4x4 Jeep Expedition Across Merapi Lava Trails',
    tagline: 'Conquer volcanic boulder trails and underground bunkers on Java’s most active volcano',
    destination: 'Sleman, Mount Merapi',
    destinationId: 'dest-yogyakarta',
    duration: '4 Hours',
    fitnessRating: 'Moderate',
    description: 'An exhilarating off-road excursion across the volcanic ash and riverbed trails of Kali Opak. Inspect the subterranean Kaliadem bunker and experience the thrilling water-splash finale in Kali Kuning.',
    keyHighlights: [
      'Customized roll-cage 4x4 jeeps driven by veteran slope community drivers',
      'Visit the historical Merapi Memorial Museum and underground bunker',
      'Exciting high-speed riverbed maneuvers along Kali Kuning gorge'
    ],
    safetyAndGear: 'Safety helmets, rain ponchos, off-road excursion insurance, and team radio coordination.',
    coverImage: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80',
    badge: 'Volcanic Off-Road'
  }
];
