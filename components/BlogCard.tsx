import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.published_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Card className="border-green-200 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative h-48">
        <Image
          src={post.cover_image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Blog
          </Badge>
        </div>
        <CardTitle className="text-green-800 line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt || post.content.substring(0, 150) + "..."}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {post.author || "Anonymous"}
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {formattedDate}
          </div>
        </div>
        <Link href={`/blog/${post.slug}`} className="w-full">
          <span className="inline-flex items-center text-green-700 hover:underline">
            Read Article <ArrowRight className="h-3 w-3 ml-2" />
          </span>
        </Link>
      </CardContent>
    </Card>
  );
}
