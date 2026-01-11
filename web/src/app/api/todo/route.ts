import { scrapeEvents } from "@/server/events";

export async function GET() {
  try {
    const events = await scrapeEvents();
    return Response.json(events);
  } catch (error) {
    console.error("[ERROR] Failed to fetch events:", error);
    return Response.json(
      { 
        error: "Failed to fetch events", 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}