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
  label: string | null; // e.g. "A" — null when a building has just one, unlettered entrance
  coordinates: Coordinates;
  /**
   * Not every entrance reaches every room (e.g. SBS: some rooms are only
   * reachable from specific entrances).
   */
  accessNote?: string;
  /** Room IDs reachable from this entrance. */
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
  /**
   * Primary/default entrance coordinates, kept for backward compatibility
   * with existing navigation code (RouteMap etc). For buildings with
   * multiple entrances, this is entrances[0] — callers that need to let
   * the user pick a specific entrance should use `entrances` instead.
   */
  coordinates: Coordinates;
  entrance: string;
  entrances: Entrance[];
  footprint?: Coordinates[];
  keywords: string[];
}

export interface RoutingNode {
  coords: Coordinates;
  /**
   * An adjacency list where the key is the connected neighbor's node ID,
   * and the value is the edge weight (distance in meters).
   */
  neighbors: Record<string, number>;
}

export type RoutingGraph = Record<string, RoutingNode>;

export interface Room {
  id: string;
  building: string; // Building["id"]
  floor: string;
  type: string;
}

export interface NextClass {
  course: string;
  lecturer: string;
  room: string;
  building: string;
  floor: string;
  time: string;
  startsInMinutes: number;
}

export interface TimetableEntry {
  time: string;
  course: string;
  room: string;
  building: string;
  active?: boolean;
}

export interface AvailableRoom {
  id: string;
  building: string;
  type: string;
  freeFrom: string;
  freeUntil: string;
}

export interface Favourite {
  id: string;
  label: string;
  sub: string;
}

export interface Profile {
  name: string;
  email: string;
  school: string;
  programme: string;
  year: string;
}
