# 🗺️ CampusLink Maps

This repository houses the frontend codebase for **CampusLink Maps**, a localized navigation and timetable-tracking engine built specifically for Strathmore University.

This project is an independent, open-source extension of the broader **CampusLink** ecosystem (The Official Campus Food & Utilities App). While the core CampusLink platform handles sensitive payments and vendor logistics, this Maps module has been made entirely open-source.

Our goal is to empower Strathmore students—whether you are a developer, an engineering student, or a designer—to take ownership of your campus map, improve the routing algorithms, and keep the room occupancy schedules fiercely accurate.

---

## ✨ Features

- **Offline-First Routing:** Utilizes a localized Dijkstra algorithm and Haversine geospatial math to calculate optimal walking paths between campus nodes entirely in the browser.
- **Live Room Occupancy:** Parses the university's master timetable to instantly show whether a specific lab or lecture hall is currently occupied or free.
- **Unified SSO:** Integrates seamlessly with the main CampusLink application using stateless cross-subdomain authentication.
- **Universal Search:** Fuzzy search capabilities for quickly locating specific buildings, offices, and lab rooms.

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Maps:** Leaflet & React-Leaflet
- **Data Fetching:** TanStack Query (React Query)
- **Icons:** Lucide React

---

## 🚀 Local Development Setup

Because this frontend is designed to be highly decoupled, you do not need to spin up a complex database or backend to run it. Data is served via static JSON files, and auth is handled via shared browser cookies.

**1. Clone the repository**

```bash
git clone https://github.com/your-org/campuslink-maps.git
cd campuslink-maps

```

**2. Install dependencies**

```bash
npm install

```

**3. Configure Environment Variables**
Create a `.env` file in the root directory. You can point the auth endpoints to the live production server so you don't need to run the backend locally.

```env
VITE_BACKEND_URL="https://api.campuslink.online/api/v1"
VITE_MAIN_APP_URL="https://campuslink.online"

```

**4. Start the development server**

```bash
npm run dev

```

---

## 📂 Codebase Architecture

If you are looking to contribute, here is where you will find the core logic:

- `/src/data/`: Contains the static `rooms.ts`, `buildings.ts`, and the timetable JSON schedules. If you are fixing a missing room or incorrect timetable, look here.
- `/src/utils/pathfinding.ts`: The Dijkstra routing engine and geospatial snapping logic.
- `/src/components/RouteMap.tsx`: The primary Leaflet map implementation.
- `/scripts/`: Python scripts used to extract KML path nodes and parse the raw Excel timetables into JSON.

---

## 🤝 Contribution Guidelines

We actively welcome Pull Requests from Strathmore students. Whether you are fixing a typo, adding a missing campus shortcut, or optimizing the routing graph, your contributions make the app better for everyone.

### How to Contribute

1. **Fork the repository** to your own GitHub account.
2. **Create a new branch** for your feature or bug fix:
   `git checkout -b feature/add-stc-shortcut` or `git checkout -b fix/room-spelling`
3. **Make your changes** and ensure the app still compiles locally.
4. **Commit your changes** using clear, descriptive commit messages:
   `git commit -m "feat: added new pedestrian path behind STC"`
5. **Push to your fork:**
   `git push origin feature/add-stc-shortcut`
6. **Open a Pull Request** against the `main` branch of this repository.

### Rules & Standards

- **TypeScript:** Please ensure your code is properly typed. Do not use `any` unless strictly necessary.
- **Prettier/ESLint:** Ensure your code passes standard linting before opening a PR.
- **Routing Graph:** If you are modifying the campus paths, do not edit `path.ts` directly. Update the `campus.kml` file and run the Python extraction script to regenerate the graph mathematically.
- **Timetables:** Do not manually edit `rooms_schedule.json`. If a class is wrong, update the raw Excel file in the `/scripts/data/` folder and re-run the parsers.

### Reporting Issues

If you find a bug, an incorrect room location, or a broken route, please open an Issue in this repository using the provided templates. Include screenshots if the map is drawing a route through a building or wall!

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
