import { User, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/lib/types";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
          {post.category}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-bold text-balance hover:text-primary transition-colors cursor-pointer">
          {post.title}
        </CardTitle>
        <CardDescription>{post.excerpt}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {post.author}
          </div>
          <div>{post.read_time}</div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString()}
          </span>
          <Link href={`/blog/${post.id}`}>
            <Button
              variant="ghost"
              className="text-accent hover:text-accent/80 p-0"
            >
              Read More
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
