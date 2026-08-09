# 🗺️ CampusLink Maps

The frontend for **CampusLink Maps** — a navigation and timetable engine built specifically for Strathmore, by people who also got lost looking for STMB F5-04 at some point.

This is an independent, open-source limb of the wider **CampusLink** ecosystem (the main app that handles food and other things you'd actually want kept private and paid-for). The core app stays closed for obvious reasons — nobody needs to see how the sausage-and-payments get made. Maps, on the other hand, is wide open, because a campus map genuinely gets better the more people who actually walk the campus are allowed to touch it.

And this isn't just "find your lecture hall." Half the point is the stuff nobody can ever find — that one staff office tucked behind a stairwell that three different people give you three different directions to. It's for first-years who don't yet have the campus memorized and are too proud to ask for the fifth time. And eventually, it's something the school itself can hand to guests and new staff on orientation day, so security isn't stuck giving the same five directions on repeat every single morning.

## Read this part before anything else

**This project is nowhere near done, and that's kind of the whole point.**

Right now, a handful of buildings are properly mapped (Oval, Admin Block, SBS, STC, STMB, MSB, Eng Labs, SERC Forge, Forge — traced by hand off satellite imagery, so forgive the odd wonky corner). One program's worth of timetable has been parsed end-to-end as a proof that the pipeline works. The walking paths between buildings exist for _some_ routes, drawn one line at a time in Google Earth, and plenty of the campus is still blank space on the map waiting for someone to draw it in.

None of that is a confession — it's an invitation. We (the team at Universe) built the plumbing: the routing engine works, the timetable parser works, the auth works, the offline story works. What's missing is _coverage_ — more buildings, more paths, more programs' timetables, more polish — and that part was never going to be a one-team job. If you go to Strathmore and you've ever had an opinion about this campus's layout (you have), there's a real, working codebase here waiting for you to make it better.

So: fork it, find the ugliest corner of campus that isn't mapped yet, and fix it. That's genuinely the whole contribution model.

One honest promise while we're here: the timetable parser is still being sharpened. Real university timetables are messier than any spec — merged cells, virtual-class links sitting where a room name should be, the occasional room typed three different ways across three different sheets — and squeezing all of that into something clean is ongoing work, not a solved problem. If a room's schedule looks off, it's very possibly the parser's fault and not yours. We're on it.

---

## ✨ Features (as they stand today)

- **Offline-First Routing** — a real Dijkstra implementation running client-side over a hand-drawn node graph, plus haversine math for distance/ETA. No routing API, no server round-trip. Works exactly as well as the graph is complete, which right now is "partially."
- **Live Room Occupancy** — parses the university's master timetable into a room-indexed schedule, so the app can tell you a room's free without you walking there to check. Coverage grows as more programs' timetables get parsed in.
- **Unified SSO** — log in once on the main CampusLink app, and Maps just knows who you are, across subdomains, via a shared cookie. No second login screen, no separate account.
- **Search** — find buildings and rooms without needing to know the difference between `CB Rm 5` and `CB RM 5` (we barely do either, and we wrote the parser).

## 🔮 What's Coming Next

Roughly in the order we're excited about them, not necessarily the order they'll actually ship:

- **Class reminders** — a notification before your next class starts, that also just tells you where it is, instead of you finding out you're in the wrong building at minute two.
- **In-building navigation** — right now, routing gets you to the building's front door and hands off to a plain room directory. Actually guiding you to the specific room, on the specific floor, is the natural next layer once outdoor routing is solid.
- **A better-looking map** — the current look is a deliberately simple flat-shape base we can build on, not the finished aesthetic. Expect it to get considerably more polished.
- **Smarter, more forgiving search** — keyword aliases for the names people actually use around campus, not just official building names.
- **Community-sourced paths** — once there's a real base of hand-drawn routes to build on, the plan is for the app to learn new shortcuts from how students actually walk, not just from what we manually traced off satellite imagery.

If any of these sound like something you'd rather build yourself than wait for, see the contribution section below — seriously.

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Maps:** Leaflet & React-Leaflet
- **Data Fetching:** TanStack Query (React Query)
- **Icons:** Lucide React

---

## 🚀 Local Development Setup

This frontend is deliberately decoupled from the backend for local dev — you don't need to stand up a database or run the API yourself. Campus data ships as static files bundled straight into the app, and auth just points at the live production API.

**1. Clone the repository**

```bash
git clone https://github.com/UniVerse-254/maps.git
cd campuslink-maps
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure Environment Variables**

Create a `.env` file in the root directory. Point the auth endpoints at production so you're not also standing up a backend just to click around:

```env
VITE_MAIN_APP_URL="https://campuslink.online"
```

**4. Start the development server**

```bash
npm run dev
```

You'll be logged in as a dummy dev user automatically — no need to actually authenticate against production while you're building.

---

## 📂 Codebase Architecture

If you're here to contribute, this is the map of the map:

- **`/src/data/`** — the static `buildings.ts`, `rooms.ts`, and the compiled timetable JSON (`courses_schedule.json`, `room_schedule.json`). Missing a room? Timetable looks wrong? Start here to understand the shape of the data, but see the rules below before editing anything in this folder directly.
- **`/src/utils/pathfinding.ts`** — the Dijkstra routing engine and the node-snapping logic that turns hand-drawn path lines into a connected graph.
- **`/src/components/RouteMap.tsx`** — the Leaflet map itself: buildings, routes, markers, the works.
- **`/scripts/`** — the Python pipeline. KML → building/entrance/path data, and raw Excel timetables → the JSON the app actually ships. This is where you go if the _source_ data is wrong, not the generated files.

---

## 🤝 Contribution Guidelines

Strathmore students, PRs are genuinely welcome — typo fixes, a missing shortcut behind STC, a smarter routing tweak, all of it counts.

### How to Contribute

1. **Fork the repository** to your own GitHub account.
2. **Create a new branch** for your feature or bug fix:
   `git checkout -b feature/add-stc-shortcut` or `git checkout -b fix/room-spelling`
3. **Make your changes** and confirm the app still builds locally.
4. **Commit** with a message that means something to a stranger reading it in a year:
   `git commit -m "feat: added pedestrian path behind STC"`
5. **Push to your fork:**
   `git push origin feature/add-stc-shortcut`
6. **Open a Pull Request** against `main`.

### Rules & Standards

- **TypeScript, properly.** Avoid `any` unless you've genuinely got no better option.
- **Lint before you push.** Standard Prettier/ESLint — a PR that fails CI on formatting is a PR that gets asked to fix formatting.
- **Routing graph:** don't hand-edit `routingGraph.ts`. It's a generated artifact. Update `campus.kml` (draw the actual path in Google Earth) and re-run the Python extraction script — that's what keeps the node graph mathematically consistent instead of slowly rotting into spaghetti.
- **Timetables:** same rule — don't hand-edit `room_schedule.json` or `courses_schedule.json`. If a class is wrong, fix the source Excel in `/scripts/data/` and re-run the parser. Hand-patching the generated JSON means the next real parse silently overwrites your fix.

### Reporting Issues

Found a bug, a room in the wrong building, or a route that walks someone straight through a wall? Open an Issue. Screenshots earn you our eternal gratitude, especially if the map's doing something we clearly didn't intend.

---

## 📜 License

MIT. See `LICENSE`.

---

Built by a small team who are also just students trying to stop getting lost on the way to 8:15am lectures. If you make this better, you're not contributing to a company's roadmap — you're fixing your own campus. Go for it.
