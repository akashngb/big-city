# DeltaHacks 12
Introducing our Project for DeltaHacks 12: BIG CITY.

## Inspiration
Real quick, imagine this: you win this Hackathon, get noticed by the Manulife reps here today, and end up with a SWEET new-grad position in San Fransisco. You're super pumped at first! You think you're living the dream, making bands, and as though nothing could ever go wrong. But even this crazy bump in motion, you quickly realize: you're alone there. The rush wears off fast, and suddenly the city feels enormous — and you feel very, very small.

Here at Big City, we understand how heavy that moment can feel; and so, we've done what we can to mitigate it by helping you find your footing at once. While we were at it, we decided it would be pretty cool to keep you alive, as well!

## What it does
The star of our application is a machine learning model which predicts crime, car accidents, fires, and more. It is trained on a dataset of over 1 million incidents over the last 10 years, which we constructed from several Toronto Police websites. The ML model is coded directly into our very own API. By inputting a location (i.e. Jane x Finch) and a date/time, one gets back a list of the most likely threats to occur in that setting (i.e. Assault With a Weapon), with a quite high confidence score. Similarly, you can input a time and an event-type (i.e. building fire) to recieve an output of probable locations for such an event to happen. When you do this, we use the Google Maps API The same applies to an input-combination of any location and event-type, to return a datetime value. An important stakeholder here is the police force of a given city. They would be able to use our API to more accurately predict crime and proactively assign more patrols and cruisers to problem-sites during problem-hours. Of course, the users of our application also benefit from this; they can communicate with our built-in Gemini Chatbot (cliche, we know), which can directly make calls to the API in our backend and update users with information about hazards near them.

Aside from keeping you safe, we also have a functionality which helps users get more involved in their community. Whenever they boot up our application, we quickly scrape the web to find events, activities, and promotions in their city. Not only do these show up in one of our cascading widgets on the home screen, but they can also find ideas and make plans using the chatbot, which communicates with both our backend database of scraped activities from the internet and posts on the app that small businesses and restaurants can create themselves.

In case that's confusing, here is one example of a usage. [User: hey! i'm taking this girl on a date tonight at 6pm, but i'm pretty broke and only have $40. Bot: Sounds interesting! You should check out the weekend special at Sid's Pottery Barn, for which the price range is $5-$25. They close at 12AM!].

We also used a weather API for the dashboard, headlines of news stories, as well as a series of hourly featured posts and more. Check out the link to our repo!

## How we built it
* python for all scripts/scraping
* pandas and numpy for data wrangling
* convex to communicate between local servers
* the web app is built in TypeScript with Nextjs/React
* AI SDK
* with google adapter for gemini
* gemini api
* google maps api
* used Exa for search/web scraping
* tailscale for laptops running microservices to communicate to eachother
