"use client";
import { Button } from "@/components/ui/button";
import MapBox from "@/components/bento/widgets/map/map";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { WeatherWidget } from "@/components/bento/widgets/weather";
import NewsWidget from "@/components/bento/widgets/news/news";
import { Github } from "@/components/bento/widgets/socials/github";
import ExpandedWeather from "@/components/bento/widgets/weather/ExpandedWeather";
import Devpost from "@/components/bento/widgets/socials/devpost";
import ExpandedNews from "@/components/bento/widgets/news/ExpandedNews";
import ExpandedEmpty from "@/components/bento/widgets/ExpandedEmpty";
import BackIcon from "@/components/bento/widgets/map/backIcon";
import { Badge } from "@/components/ui/badge";
import ChatUi from "@/components/chat";
import { Linkedin } from "@/components/bento/widgets/socials/linkedin";

const routes = [
  {
    from: "80 York Mills Rd",
    to: "100 Queen St W",
    distance: "10.5 km",
    duration: "15 mins",
  },
  {
    from: "25 Yonge St",
    to: "Union Station",
    distance: "2.5 km",
    duration: "5 mins",
  },
];

export default function Page() {
  const posts = useQuery(api.functions.posts.listPosts, { limit: 5 });

  return (
    <div className="w-screen h-screen relative">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-transparent">
            <BackIcon className="size-4.5" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-screen h-screen max-w-none sm:max-w-none border-none p-0 overflow-hidden bg-transparent"
        >
          <div className="grid gap-6 p-4 grid-rows-8 grid-cols-16 h-full">
            <Dialog>
              <DialogTrigger asChild>
                <div className="row-span-4 col-span-4 row-start-2 col-start-2 cursor-pointer">
                  <WeatherWidget className="w-full h-full" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                <DialogTitle>Weather</DialogTitle>
                <ExpandedWeather />
              </DialogContent>
            </Dialog>

            <div className="bento-card p-6 overflow-y-hidden row-span-3 col-span-5 row-start-2 col-start-6 animate-slide-up fill-mode-[both] [animation-delay:0.1s] cursor-pointer bg-[rgba(247,241,241,0.59)] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[8.4px] border border-[rgba(247,241,241,0.19)] ">
              <div className="space-y-4">
                {routes.map((route, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/40 rounded-xl p-4 hover:bg-white/60 transition-all duration-300 hover:shadow-md "
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="shrink-0 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-blue-200"></div>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {route.from}
                        </p>
                      </div>

                      <div className="shrink-0 px-3">
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>

                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="shrink-0 w-2 h-2 rounded-full bg-red-500 ring-2 ring-red-200"></div>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {route.to}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200/50">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                        <span className="font-medium">{route.distance}</span>
                      </div>

                      <Badge variant="secondary">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {route.duration}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bento-card p-4 overflow-hidden row-span-3 col-span-1 row-start-2 col-start-11 animate-slide-up fill-mode-[both] [animation-delay:0.2s] cursor-pointer bg-[rgba(247,241,241,0.59)] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[8.4px] border border-[rgba(247,241,241,0.19)]">
              <div className="w-full h-full flex flex-col items-center justify-between">
                <Github />
                <Linkedin />
                <Devpost className="w-10 h-10" />
              </div>
            </div>

            <div className="bento-card p-4 overflow-hidden row-span-2 col-span-4 row-start-2 col-start-12 animate-slide-up fill-mode-[both] [animation-delay:0.3s] bg-[rgba(247,241,241,0.59)] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[8.4px] border border-[rgba(247,241,241,0.19)]">
              <div className="w-full h-full flex flex-col gap-2 overflow-y-auto">
                {posts === undefined ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Loading posts...
                  </div>
                ) : posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-white/40 rounded-lg p-3 hover:bg-white/60 transition-all duration-300 border border-gray-200/50 shrink-0"
                    >
                      <p className="text-xs font-semibold text-gray-900 truncate mb-1">
                        {post.content.substring(0, 50)}...
                      </p>
                      {post.images && post.images.length > 0 && (
                        <img
                          src={post.images[0].url}
                          alt={post.images[0].alt}
                          className="w-full h-12 object-cover rounded-md mb-1"
                        />
                      )}
                      <div className="flex gap-1 flex-wrap">
                        {post.tags &&
                          post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No posts yet
                  </div>
                )}
              </div>
            </div>
            <div className="bento-card p-4 overflow-hidden row-span-2 col-span-4 row-start-6 col-start-2 animate-slide-up fill-mode-[both] [animation-delay:0.4s] cursor-pointer bg-[rgba(247,241,241,0.59)] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[8.4px] border border-[rgba(247,241,241,0.19)]"></div>
            {/* <div
              className="bento-card p-4 overflow-hidden row-span-4 col-span-4 row-start-4 col-start-12 animate-slide-up fill-mode-[both] [animation-delay:0.6s] cursor-pointer bg-[rgba(247,241,241,0.59)] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[8.4px] border border-[rgba(247,241,241,0.19)]"
              onClick={() => setExpandedCard("news")}
            >
            </div> */}
            <div className="row-span-4 col-span-4 row-start-4 col-start-12 flex flex-col">
              <NewsWidget />
            </div>
            <div className="row-span-3 col-span-6 row-start-5 col-start-6 cursor-pointer bg-[rgba(247,241,241,0.59)] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[8.4px] border border-[rgba(247,241,241,0.19)]">
              <ChatUi />
            </div>
          </div>

          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
      <MapBox className="w-full h-full z-0" />
    </div>
  );
}
