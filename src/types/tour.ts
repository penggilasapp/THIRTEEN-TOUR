export interface Region {
  id: 'bali' | 'java';
  name: 'Bali' | 'Java';
  slug: 'bali' | 'java';
  description: string;
  heroImage: string;
}

export interface Destination {
  id: string;
  regionId: 'bali' | 'java';
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  galleryImages: string[];
  experiences: string[];
  practicalInformation: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublished?: boolean;
  // Compatibility fields
  tagline?: string;
  description?: string;
  highlights?: string[];
  climateSafetyNotes?: string;
  coverImage?: string;
  heroBadge?: string;
  status?: 'core' | 'development' | 'expansion';
  statusLabel?: string;
}

export type TourType = 'fixed_package' | 'custom_private' | 'modular_tour' | 'multiday_expedition';
export type ServiceTier = 'essential' | 'private' | 'premium_concierge';

export interface ItineraryActivity {
  time: string;
  activity: string;
  location: string;
  notes?: string;
  partnerTypeNeeded?: 'driver_transport' | 'mountain_guide' | 'jeep_operator' | 'boutique_stay' | 'equipment_rental';
}

export interface ItineraryDayTemplate {
  dayNumber: number;
  title: string;
  subtitle: string;
  schedule: ItineraryActivity[];
  meals: string[];
  stayLocation: string;
}

export interface TourPackage {
  id: string;
  code: string;
  title: string;
  destinationId: string;
  destinationName: string;
  tourType: TourType;
  serviceTier: ServiceTier;
  durationDays: number;
  durationNights: number;
  indicativeDuration: string;
  shortDescription: string;
  experienceNarrative: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  safetyMandates: string[];
  itineraryDays: ItineraryDayTemplate[];
  targetAudience: string;
  active: boolean;
  coverImage: string;
  indicativePriceIdr?: number;
  indicativePriceUsd?: number;
  routeSummary?: string;
  routeWaypoints?: string[];
  terrainType?: string;
  fitnessLevel?: string;
  fleetType?: string;
}

export type PipelineStatus = 
  | 'new_inquiry' 
  | 'reviewing' 
  | 'quotation_sent' 
  | 'payment_pending' 
  | 'confirmed' 
  | 'in_progress' 
  | 'completed' 
  | 'lost';

export interface QuotationLineItem {
  id: string;
  description: string;
  costIdr: number;
  category: 'transport' | 'accommodation' | 'guide_permits' | 'activities' | 'special_concierge';
}

export interface Quotation {
  version: number;
  currency: 'USD' | 'IDR' | 'EUR' | 'AUD';
  exchangeRateIdrToCurrency: number; // e.g. 1 USD = 16,000 IDR
  baseCostIdr: number;
  markupPercent: number; // e.g. 25%
  totalPriceIdr: number;
  totalPriceCurrency: number;
  depositPercent: number; // 30% standard
  depositAmountCurrency: number;
  balanceAmountCurrency: number;
  validUntil: string;
  notes: string;
  lineItems: QuotationLineItem[];
  sentAt?: string;
}

export interface ActiveItineraryActivity {
  id: string;
  time: string;
  activity: string;
  location: string;
  partnerId?: string;
  partnerName?: string;
  completed?: boolean;
}

export interface ActiveItineraryDay {
  dayNumber: number;
  date: string;
  title: string;
  subtitle: string;
  stayLocation: string;
  activities: ActiveItineraryActivity[];
  driverNotes: string;
  safetyChecklistVerified: boolean;
  emergencyContact?: string;
}

export interface FollowUpLog {
  id: string;
  date: string;
  specialist: string;
  channel: 'email' | 'whatsapp' | 'phone';
  summary: string;
  nextFollowUpDate?: string;
}

export interface BookingInquiry {
  id: string; // INQ-2026-xxx
  bookingRef: string; // TT-2026-xxx
  createdAt: string;
  leadSource: 'website_seo' | 'instagram_social' | 'partner_agency' | 'direct_referral' | 'paid_campaign';
  customer: {
    name: string;
    email: string;
    phone: string;
    country: string;
    preferredLanguage: 'en' | 'id' | 'de' | 'fr' | 'nl' | 'zh';
  };
  tripDetails: {
    destinationId: string;
    destinationName: string;
    packageId?: string;
    packageTitle: string;
    serviceTier: ServiceTier;
    tourType: TourType;
    startDate: string;
    endDate: string;
    paxCount: number;
    adults: number;
    children: number;
    fitnessLevel: 'easy' | 'moderate' | 'active_adventurous';
    specialRequests: string;
    dietaryRestrictions?: string;
  };
  pipelineStatus: PipelineStatus;
  assignedSpecialist: string;
  quotation?: Quotation;
  paymentDetails: {
    method?: 'bank_transfer' | 'electronic_wise' | 'credit_card_gateway';
    depositPaid: boolean;
    depositPaidAt?: string;
    depositReference?: string;
    balancePaid: boolean;
    balancePaidAt?: string;
    balanceReference?: string;
    paymentNotes?: string;
  };
  itinerary: ActiveItineraryDay[];
  followUps: FollowUpLog[];
  internalNotes: string;
  lossReason?: string;
}

export type PartnerType = 'driver_transport' | 'mountain_guide' | 'jeep_operator' | 'boutique_stay' | 'equipment_rental';

export interface CertifiedPartner {
  id: string;
  name: string;
  type: PartnerType;
  destination: string;
  verified: boolean;
  licenseNumber: string;
  contactPerson: string;
  phone: string;
  email: string;
  safetyRating: number; // 1 to 5
  lastAuditDate: string;
  rateCardSummary: string;
  vehicleFleetOrEquipment?: string;
  notes: string;
}
