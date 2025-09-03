import BlogCard from "./BlogCard";
import { BlogPost } from "@/lib/types";

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.length > 0 ? (
        posts.map((post) => <BlogCard key={post.id} post={post} />)
      ) : (
        <p className="text-muted-foreground">No blog posts available.</p>
      )}
    </div>
  );
}
