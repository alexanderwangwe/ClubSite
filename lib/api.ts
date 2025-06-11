import { createClient } from '@supabase/supabase-js';
import type { BlogPost, Event, EventGallery } from './types';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Blog Posts
export async function getBlogPosts(page = 1, limit = 6) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data: posts, count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(from, to);

  return {
    posts: posts as BlogPost[],
    total: count || 0,
  };
}

export async function getBlogPost(slug: string) {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return post as BlogPost;
}

// Events
export async function getEvents(page = 1, limit = 6) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data: events, count } = await supabase
    .from('events')
    .select('*', { count: 'exact' })
    .order('event_date', { ascending: true })
    .range(from, to);

  return {
    events: events as Event[],
    total: count || 0,
  };
}

export async function getEvent(id: string) {
  const { data: event, error } = await supabase
    .from('events')
    .select('*, gallery:event_gallery(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return event as Event & { gallery: EventGallery[] };
}

// Event Gallery
export async function getEventGallery(eventId: string) {
  const { data: gallery, error } = await supabase
    .from('event_gallery')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return gallery as EventGallery[];
}

// Admin functions (you'll need to add authentication later)
export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single();

  if (error) throw error;
  return data as BlogPost;
}

export async function createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select()
    .single();

  if (error) throw error;
  return data as Event;
}

export async function addEventGalleryImage(image: Omit<EventGallery, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('event_gallery')
    .insert([image])
    .select()
    .single();

  if (error) throw error;
  return data as EventGallery;
} 