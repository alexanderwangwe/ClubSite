import { User, ArrowRight, ArrowLeft, Leaf, BookOpen, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function BlogsPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Siwaka Cleanup: Lessons from the Ground",
      excerpt:
        "Highlights from our recent community cleanup day in Siwaka estate, reflecting on challenges, teamwork, and impact.",
      image: "/heroimage.png",
      author: "SESC Student Team",
      date: "2024-09-14",
      readTime: "5 min read",
      category: "Community Action",
    },
    {
      id: 2,
      title: "Recycling on Campus: What Works and What Doesn’t",
      excerpt:
        "An honest look at Strathmore’s recycling bins, student participation, and how we can make waste management more effective.",
      image: "/heroimage.png",
      author: "Joy Wanjiku",
      date: "2024-09-10",
      readTime: "6 min read",
      category: "Recycling",
    },
    {
      id: 3,
      title: "Why Trees Matter: Reflections on Our Tree Planting Initiative",
      excerpt:
        "Planting trees isn’t just about greenery. It’s about community, climate action, and leaving a legacy on campus.",
      image: "/heroimage.png",
      author: "Brian Otieno",
      date: "2024-09-02",
      readTime: "7 min read",
      category: "Conservation",
    },
    {
      id: 4,
      title: "Student Voices: Climate Change and Education",
      excerpt:
        "How Strathmore students are engaging with climate change in and outside the classroom.",
      image: "/heroimage.png",
      author: "SESC Editorial Team",
      date: "2024-08-20",
      readTime: "8 min read",
      category: "Awareness",
    },
    {
      id: 5,
      title: "Sustainability Fair 2024: What We Learned",
      excerpt:
        "A recap of our Sustainability Fair, featuring eco-friendly innovations, student projects, and community partners.",
      image: "/heroimage.png",
      author: "Maria Njeri",
      date: "2024-08-10",
      readTime: "6 min read",
      category: "Campus Life",
    },
    {
      id: 6,
      title: "The Science of Waste: Understanding Environmental Impact",
      excerpt:
        "A simplified breakdown of how poor waste management affects our air, water, and health.",
      image: "/heroimage.png",
      author: "Dr. James Mutua",
      date: "2024-08-01",
      readTime: "10 min read",
      category: "Science",
    },
  ]

  const categories = [
    "All",
    "Campus Life",
    "Recycling",
    "Conservation",
    "Awareness",
    "Community Action",
    "Science",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">SESC Blog</h2>
          <p className="text-xl text-muted-foreground max-w-3xl text-pretty">
            Stories, reflections, and insights from Strathmore students and faculty working toward a cleaner, greener community.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="text" placeholder="Search articles..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className={category === "All" ? "bg-primary text-primary-foreground" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
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
                  <CardDescription className="text-pretty">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div>{post.readTime}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</span>
                    <Button variant="ghost" className="text-accent hover:text-accent/80 p-0">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h3>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Subscribe to get the latest blog posts, event highlights, and sustainability insights from SESC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
