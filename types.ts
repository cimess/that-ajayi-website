export interface CollectionItem {
  id: string | number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  affiliateLink?: string;
  brandName?: string;
  isAffiliate?: boolean;
  spinPath?: string;
  spinFrames?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface BrandSubmission {
  id: string;
  brandName: string;
  contactEmail: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  dateSubmitted: string;
}

export interface ClientBooking {
  id: string;
  clientName: string;
  email: string;
  eventType: string;
  date: string;
  budget: string;
  status: 'pending' | 'confirmed' | 'completed';
  dateRequested: string;
}
