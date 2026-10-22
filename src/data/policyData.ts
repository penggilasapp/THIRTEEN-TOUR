export type FAQCategory = 
  | 'Booking & Payment'
  | 'Travel Requirements & Visas'
  | 'Mountain Safety & Health'
  | 'Overland Logistics & Transport'
  | 'Cancellations & Force Majeure';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  tags?: string[];
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'Booking & Payment',
    question: 'Why does THIRTEEN Operator Tour not display fixed public prices on the website?',
    answer: 'In accordance with our bespoke travel philosophy, all our expeditions operate strictly as 100% private journeys (never combined with strangers). Your tailored quotation is calculated transparently based on your exact party size (solo traveler, private couple, family, or executive group), travel dates, boutique accommodation preferences, and custom itinerary specifications. An official guaranteed quotation is locked in once your bespoke inquiry is reviewed by our travel designers.',
    tags: ['Pricing', 'Private Tour', 'Quotation']
  },
  {
    id: 'faq-02',
    category: 'Booking & Payment',
    question: 'What is the payment schedule and deposit requirement?',
    answer: 'To secure private vehicle allocations, licensed alpine guides, and boutique mountain lodge suite reservations, an initial commitment deposit is required upon quotation confirmation. Remaining balance milestones are structured transparently based on your itinerary and travel window.',
    tags: ['Deposit', 'Milestones', 'Payment']
  },
  {
    id: 'faq-03',
    category: 'Booking & Payment',
    question: 'What payment methods are supported for international and domestic guests?',
    answer: 'We accept international multi-currency transfers via Wise (USD, EUR, AUD, GBP, SGD) with zero hidden banking fees, 3D-Secure encrypted credit card gateways (Visa, MasterCard, Amex), and Indonesian local bank transfers (BCA, Mandiri, BNI) in IDR.',
    tags: ['Wise', 'Credit Card', 'Wire Transfer']
  },
  {
    id: 'faq-04',
    category: 'Booking & Payment',
    question: 'How do I receive my official booking confirmation and itinerary tracking code?',
    answer: 'Once your commitment deposit is verified by our finance team, the system automatically generates an Official Booking Voucher containing your unique Booking Reference (e.g. TT-2026-081). You can input this reference on our website or Client Portal at any time to inspect your live hour-by-hour schedule, driver credentials, and hotel confirmation vouchers.',
    tags: ['Voucher', 'Tracking Code', 'Confirmation']
  },
  {
    id: 'faq-05',
    category: 'Travel Requirements & Visas',
    question: 'What are the passport validity requirements to enter Indonesia?',
    answer: 'All international travelers must hold a passport with a minimum of 6 months validity remaining from their date of arrival in Indonesia, along with at least two blank visa pages. Temporary or emergency travel documents are subject to strict immigration scrutiny and may not be eligible for Visa on Arrival.',
    tags: ['Passport', 'Immigration', 'Validity']
  },
  {
    id: 'faq-06',
    category: 'Travel Requirements & Visas',
    question: 'How do I obtain an Indonesian Tourist Visa (e-VoA)?',
    answer: 'Citizens from over 97 countries (including the US, UK, Australia, EU nations, and Canada) can obtain a 30-day Tourist Visa on Arrival (VoA) for IDR 500,000 (~$35 USD). You can either apply online before departure via the official Indonesian Immigration e-VoA portal (molina.imigrasi.go.id) or pay directly at dedicated immigration counters upon landing at Jakarta (CGK), Surabaya (SUB), or Bali (DPS).',
    tags: ['Visa on Arrival', 'e-VoA', 'Entry Requirements']
  },
  {
    id: 'faq-07',
    category: 'Travel Requirements & Visas',
    question: 'What is the Bali Tourist Levy and Electronic Customs Declaration (e-CD)?',
    answer: 'All international travelers arriving into Indonesia must submit an Electronic Customs Declaration (e-CD) online within 48 hours of flight departure (ecd.beacukai.go.id), which generates a QR code scanned at customs. If your overland itinerary concludes in Bali or includes Bali, foreign travelers are also required by regional law to pay the Bali Tourist Levy of IDR 150,000 (~$10 USD per person) via lovebali.baliprov.go.id.',
    tags: ['Customs QR', 'Bali Tax', 'Arrival Regulations']
  },
  {
    id: 'faq-08',
    category: 'Mountain Safety & Health',
    question: 'Is the midnight Mount Ijen blue flame trek safe for beginners or children?',
    answer: 'Mount Ijen is an active acidic volcanic caldera requiring a steep 3-kilometer mountain ascent (approx. 2 hours) followed by a rocky descent into the crater. Due to natural sulfur dioxide gas concentrations, guests with active asthma, cardiac conditions, or severe respiratory impairments are prohibited from descending into the crater. Children under 7 and seniors over 65 are recommended to enjoy the dawn panorama from the crater rim. All THIRTEEN guests are provided certified 3M dual-cartridge respirators and private alpine guides.',
    tags: ['Mount Ijen', 'Sulfur Gas', 'Blue Flame', '3M Respirator']
  },
  {
    id: 'faq-09',
    category: 'Mountain Safety & Health',
    question: 'What clothing and cold-weather gear do I need for Bromo and Ijen?',
    answer: 'Temperatures on the Bromo caldera rim and Mount Ijen peak drop to 3°C - 8°C (37°F - 46°F) before sunrise, accompanied by brisk mountain winds. We strongly recommend thermal base layers, a warm fleece or down jacket, windbreaker outer shell, long trekking pants, warm knit beanie, gloves, and sturdy athletic or hiking shoes with deep traction. Headlamps are provided by our alpine guides.',
    tags: ['Packing Checklist', 'Cold Weather', 'Footwear']
  },
  {
    id: 'faq-10',
    category: 'Mountain Safety & Health',
    question: 'Do I need a medical health certificate to climb Mount Ijen?',
    answer: 'Yes. The Natural Resources Conservation Agency (BBKSDA East Java) requires all hikers at Mount Ijen to present a valid medical health certificate (Surat Keterangan Sehat) confirming blood pressure, heart, and respiratory fitness. THIRTEEN arranges an accredited clinic health screening for you seamlessly in Banyuwangi before the midnight ascent.',
    tags: ['Health Certificate', 'BBKSDA', 'Medical Check']
  },
  {
    id: 'faq-11',
    category: 'Overland Logistics & Transport',
    question: 'What types of private vehicles and chauffeurs are utilized?',
    answer: 'We exclusively deploy modern, air-conditioned executive fleet: Toyota HiAce Premio luxury vans or Toyota Innova Reborn MPVs for long-distance highway comfort, and dedicated private 4x4 Toyota Land Cruisers for navigating the rugged volcanic sand sea of Mount Bromo. Every chauffeur is vetted, non-smoking, professionally licensed, and trained in passenger comfort.',
    tags: ['Vehicles', 'Chauffeur', '4x4 Land Cruiser']
  },
  {
    id: 'faq-12',
    category: 'Overland Logistics & Transport',
    question: 'How does the overland transfer between East Java and Bali operate?',
    answer: 'Our overland routes feature a smooth door-to-door transit: your private vehicle drives directly onto the Ketapang-to-Gilimanuk roll-on/roll-off ferry crossing the scenic Bali Strait (approx. 45 minutes). You remain in the same comfortable vehicle with your luggage secure, and our chauffeur drives you directly to your resort in Seminyak, Canggu, Ubud, Uluwatu, or Sanur.',
    tags: ['Java to Bali', 'Ferry Crossing', 'Door to Door']
  },
  {
    id: 'faq-13',
    category: 'Overland Logistics & Transport',
    question: 'Where can our private expedition start and conclude?',
    answer: 'Our overland journeys offer complete logistical flexibility. Common pickup points include Juanda International Airport Surabaya (SUB), Malang railway station, Yogyakarta International Airport (YIA), Banyuwangi Airport (BWX), or any hotel/villa in South Bali. Drop-offs can be customized to any point on Java or Bali according to your ongoing flights.',
    tags: ['Pickup Points', 'Airports', 'Transfers']
  },
  {
    id: 'faq-14',
    category: 'Cancellations & Force Majeure',
    question: 'What happens in the event of sudden volcanic activity or national park closure?',
    answer: 'Guest safety is our absolute priority. If volcanology authorities (PVMBG) or national parks (TNBTS/BBKSDA) issue an elevated volcanic alert that temporarily closes climbing trails, our field team immediately pivots your itinerary to premier alternative regional highlights (such as Baluran African Savanna, Jagir Waterfalls, or colonial coffee plantations) without additional surcharges, or reschedules your expedition under our Force Majeure policy.',
    tags: ['Volcanic Alert', 'PVMBG', 'Contingency']
  },
  {
    id: 'faq-15',
    category: 'Cancellations & Force Majeure',
    question: 'What is the cancellation and refund policy if my plans change?',
    answer: 'Our policy reflects real non-refundable third-party commitments (mountain lodge suite holds, alpine guide retainers, and non-transferable national park barcodes): cancellations made >30 days before departure receive an 85% refund; 15-30 days receive a 50% refund; cancellations made <14 days are non-refundable. Force Majeure volcanic closures qualify for 100% route credit valid for 12 months.',
    tags: ['Cancellation', 'Refund Schedule', 'Terms']
  }
];

export const BOOKING_INFO_DATA = {
  title: 'Booking Information & 5-Step Journey Flow',
  subtitle: 'A transparent, reliable, and frictionless bespoke booking process',
  steps: [
    {
      step: '01',
      title: 'Discovery & Inquiry Form',
      description: 'Select your preferred destination or expedition route. Specify your travel window, party size, and comfort tier (Essential, Private Signature, or Premium Concierge).'
    },
    {
      step: '02',
      title: 'Bespoke Consultation (Travel Designer)',
      description: 'Your designated Travel Designer contacts you via WhatsApp or official email in under 15 minutes to confirm logistical details and specific preferences.'
    },
    {
      step: '03',
      title: 'Official Quotation & Guaranteed Route',
      description: 'Receive an itemized official quotation with transparent line items, hour-by-hour schedules, full inclusions, and safety checklists.'
    },
    {
      step: '04',
      title: 'Reservation Confirmation Deposit',
      description: 'Confirm your expedition with your initial commitment deposit. Once verified, the system issues an Official Booking Voucher and your unique tracking code (e.g., TT-2026-081).'
    },
    {
      step: '05',
      title: 'Balance Settlement & Live Itinerary',
      description: 'Settle the remaining balance prior to departure according to your agreed schedule. Gain live access to your digital Client Itinerary Portal alongside direct concierge contact details.'
    }
  ]
};

export const CANCELLATION_POLICY_DATA = {
  title: 'Cancellation & Refund Policy',
  notice: 'We operate a risk-based cancellation schedule reflecting real non-refundable third-party commitments:',
  rules: [
    {
      period: 'More than 30 Days Prior to Departure (>30 Days)',
      refundRate: '85% Refund',
      details: '85% refund of total monies paid (15% retained to cover non-refundable banking processing and administrative overhead).'
    },
    {
      period: '15 to 30 Days Prior to Departure (15-30 Days)',
      refundRate: '50% Refund',
      details: '50% refund of the total expedition value, as 4x4 vehicle holds and boutique mountain lodge allocations are locked non-refundable.'
    },
    {
      period: 'Less than 14 Days Prior to Departure (<14 Days)',
      refundRate: 'Non-Refundable (0%)',
      details: 'Strictly non-refundable. Official national park conservation entry barcodes (TNBTS & BBKSDA issued to passport IDs), alpine guide retainers, and hotel suite guarantees are locked.'
    },
    {
      period: 'Force Majeure (Volcanic Alert / Natural Disaster)',
      refundRate: 'Free Reschedule / Route Credit',
      details: 'If government volcanology authorities (PVMBG) close crater access due to eruptions or toxic gas, 100% of unspent balances are converted into a 12-month travel credit or rerouted to alternative luxury experiences.'
    }
  ]
};

export const TERMS_CONDITIONS_DATA = {
  title: 'Terms & Conditions of Service',
  sections: [
    {
      title: '1. Exclusively Private Operations',
      content: 'All THIRTEEN Operator Tour journeys are operated strictly as private expeditions without joining unfamiliar travelers into your vehicle or party. All chauffeurs and guides are dedicated exclusively to your group.'
    },
    {
      title: '2. Physical Fitness & Medical Disclosure',
      content: 'Guests participating in active volcanic treks (specifically Mount Ijen crater descent and Bromo caldera climbing) must be in reasonable physical condition and disclose pre-existing cardiovascular or acute respiratory ailments. Guests with chronic asthma are prohibited from descending into the sulfur lake basin.'
    },
    {
      title: '3. Mandatory Safety Equipment',
      content: 'Wearing provided dual-cartridge acidic gas respirators is legally mandated while inside the active sulfur zones of Mount Ijen. Loss or deliberate damage of safety gear is subject to replacement at cost.'
    },
    {
      title: '4. Weather & Safety Schedule Adjustments',
      content: 'The tour operator reserves the right to modify activity schedules or re-route transfer roads if severe weather conditions (flash floods, volcanic alerts, or landslides) compromise passenger safety.'
    },
    {
      title: '5. Comprehensive Personal Travel Insurance',
      content: 'While national park entry tickets include statutory basic indemnity, all international and domestic travelers are strongly advised to hold comprehensive personal travel insurance covering emergency medical evacuation.'
    }
  ]
};

export const PRIVACY_POLICY_DATA = {
  title: 'Guest Data Privacy Policy',
  sections: [
    {
      title: '1. Identification & Passport Data Collection',
      content: 'We collect guest legal names, passport/national ID numbers, nationalities, phone numbers, and dietary requirements strictly for the issuance of government conservation permits (BBKSDA Kawah Ijen and TNBTS Bromo e-permits), executive rail tickets, and boutique hotel guest registrations.'
    },
    {
      title: '2. Data Protection & Zero Third-Party Marketing',
      content: 'Guest personal data is stored in encrypted systems and is never sold, leased, or transmitted to outside commercial marketing entities under any circumstances.'
    },
    {
      title: '3. Data Deletion Requests',
      content: 'Upon completion of your journey and statutory tax record compliance, guests may request full deletion of their contact records by emailing privacy@thirteen-tour.com.'
    }
  ]
};

export const CONTACT_INFO_DATA = {
  headline: 'Contact the THIRTEEN Concierge Team',
  subheadline: 'Available 24 hours a day, 7 days a week for route planning, emergency support, and bespoke private coordination across Indonesia.',
  phoneWhatsApp: '+62 812-3456-7890',
  phoneWhatsAppDisplay: '+62 812-3456-7890 (24/7 Priority WhatsApp)',
  reservationEmail: 'concierge@thirteen-tour.com',
  emergencyEmail: 'duty-manager@thirteen-tour.com',
  operatingHours: 'Customer Service: 07:00 - 23:00 WIB • Emergency Desk: 24/7 Continuous',
  offices: [
    {
      city: 'Bali Headquarters & Concierge Desk',
      address: 'Jl. Danau Tamblingan No. 88, Sanur, Denpasar Selatan, Bali 80228',
      role: 'Head of Operations & Guest Relations'
    },
    {
      city: 'East Java Expedition Hub (Bromo & Ijen)',
      address: 'Jl. Jenderal Sudirman No. 42, Banyuwangi, East Java 68411',
      role: 'Fleet Depo, 4x4 Maintenance & Safety Gear Logistics'
    },
    {
      city: 'Yogyakarta Cultural Center Desk',
      address: 'Jl. Prawirotaman No. 16, Mergangsan, Yogyakarta City 55153',
      role: 'Heritage Guides & Rail Overland Logistics'
    }
  ],
  socialMedia: [
    { name: 'Instagram', handle: '@thirteen.operator.tour', url: 'https://instagram.com' },
    { name: 'WhatsApp Business', handle: '+62 812-3456-7890', url: 'https://wa.me/6281234567890' },
    { name: 'YouTube Expeditions', handle: 'THIRTEEN Expeditions ID', url: 'https://youtube.com' },
    { name: 'TripAdvisor Verified', handle: 'THIRTEEN Operator Tour Indonesia', url: 'https://tripadvisor.com' }
  ]
};
