import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function GalleryPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: images } = await supabase
    .from("event_gallery")
    .select("*, events(title)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
        <Link href="/admin/gallery/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images?.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="relative aspect-video">
              <Image
                src={image.image_url}
                alt={image.caption || "Gallery image"}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">
                Event: {image.events?.title || "No event"}
              </p>
              {image.caption && (
                <p className="text-sm text-gray-800 mb-2">{image.caption}</p>
              )}
              <p className="text-xs text-gray-500">
                Added: {formatDate(image.created_at)}
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <Link href={`/admin/gallery/${image.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
