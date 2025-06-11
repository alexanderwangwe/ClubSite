export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  author: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  category: string;
  image: string | null;
  max_volunteers: number;
  registered_volunteers: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventGallery {
  id: string;
  event_id: string;
  image_url: string;
  caption: string | null;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  subscribed_to_newsletter: boolean;
  subscribed_to_events: boolean;
  created_at: string;
  updated_at: string;
}

export type EventWithGallery = Event & {
  gallery: EventGallery[];
}; 