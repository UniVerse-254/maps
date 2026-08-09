export interface Coordinates {
  lat: number;
  lng: number;
}

export type PhaseId = "phase1" | "phase2";

export interface Phase {
  id: PhaseId;
  label: string;
  color: string;
}

export type Phases = Record<PhaseId, Phase>;

export interface Entrance {
  id: string; // e.g. "sbs-entrance-a"
  label: string | null; // e.g. "A"
  coordinates: Coordinates;
  accessNote?: string;
  accessibleRoomIds?: string[];
}

export interface Building {
  id: string;
  code: string | null;
  name: string;
  phase: PhaseId | null;
  homeSchool: string;
  description: string;
  floors: string[];
  coordinates: Coordinates;
  entrance: string;
  entrances: Entrance[];
  footprint?: Coordinates[];
  keywords: string[];
}

export interface RoutingNode {
  coords: Coordinates;
  neighbors: Record<string, number>;
}

export type RoutingGraph = Record<string, RoutingNode>;

export interface Room {
  id: string;
  buildingId: string;
  floor: string;
  type: string;
}

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface ClassSession {
  id: string; // e.g., "BEE3202-MON-0815"
  courseCode: string;
  courseTitle: string;
  roomId: string;
  lecturer: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  group: string | null;
  isVirtual: boolean;
  venues: string[];
  meetingId: string | null;
}

export interface RawSession {
  title: string;
  lecturer: string | null;
  day: DayOfWeek;
  start: string;
  end: string;
  group: string | null;
  is_virtual: boolean;
  venues: string[];
  meeting_id: string | null;
}

export interface ValidatedTimetable {
  updatedAt: number;
  sessions: ClassSession[];
}

export interface NextClass extends ClassSession {
  startsInMinutes: number;
}

export interface AvailableRoom extends Room {
  freeFrom: string;
  freeUntil: string;
}

export type BookmarkType = "room" | "building";

export interface Favourite {
  id: string;
  type: BookmarkType;
  addedAt: number;
}

export interface CourseSelection {
  courseCode: string;
  group: string | null; // e.g., "YEAR 2 GROUP A" or null if no groups exist
}

export interface Profile {
  name: string;
  email: string;
  school: string;
  programme: string;
  year: string;
}
