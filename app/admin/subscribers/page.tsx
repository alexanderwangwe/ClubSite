import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Mail, Bell } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function SubscribersPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: subscribers } = await supabase
    .from("subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  const handleExport = () => {
    const csvContent = [
      ["Email", "Name", "Newsletter", "Events", "Subscribed On"],
      ...(subscribers?.map((sub) => [
        sub.email,
        sub.name || "",
        sub.subscribed_to_newsletter ? "Yes" : "No",
        sub.subscribed_to_events ? "Yes" : "No",
        formatDate(sub.created_at),
      ]) || []),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Subscribers</h1>
        <Button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subscriptions</TableHead>
              <TableHead>Subscribed On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers?.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell className="font-medium">
                  {subscriber.email}
                </TableCell>
                <TableCell>{subscriber.name || "-"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {subscriber.subscribed_to_newsletter && (
                      <span className="flex items-center text-sm text-green-600">
                        <Mail className="h-4 w-4 mr-1" />
                        Newsletter
                      </span>
                    )}
                    {subscriber.subscribed_to_events && (
                      <span className="flex items-center text-sm text-green-600">
                        <Bell className="h-4 w-4 mr-1" />
                        Events
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{formatDate(subscriber.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
