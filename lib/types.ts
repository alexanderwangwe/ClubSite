export interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // ISO date string
  time?: string;
  location: string;
  image?: string;
  category?: string;
  register_link?: string;
  created_at?: string;
}


export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO date
  read_time: string;
  category: string;
  image?: string;
  icon?: string;
  content?: string; // for full article view
}

export interface GalleryItem {
  id: number; // bigint
  title?: string;
  description?: string;
  image_url: string;
  category?: string;
  caption?: string;
  event_id?: number; // bigint reference to Event
  created_at?: string;
}