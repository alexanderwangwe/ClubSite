export interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // ISO string from Supabase
  time?: string;
  location: string;
  image?: string;
  attendees?: number;
  category?: string;
  register_link?: string;
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
