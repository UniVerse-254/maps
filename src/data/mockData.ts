import type {
  Building,
  Room,
  NextClass,
  TimetableEntry,
  AvailableRoom,
  Favourite,
  Profile,
  Phases,
} from "@/types";

export const nextClass: NextClass = {
  course: "Software Engineering",
  lecturer: "Dr. James Kariuki",
  room: "BB104",
  building: "Beta Building",
  floor: "First Floor",
  time: "10:00 - 11:30",
  startsInMinutes: 12,
};

export const timetable: TimetableEntry[] = [
  {
    time: "08:00 - 09:30",
    course: "Database Systems",
    room: "AB205",
    building: "AB",
  },
  {
    time: "10:00 - 11:30",
    course: "Software Engineering",
    room: "BB104",
    building: "BB",
    active: true,
  },
  {
    time: "12:00 - 13:00",
    course: "Engineering Mathematics",
    room: "DB104",
    building: "DB",
  },
  {
    time: "14:00 - 16:00",
    course: "Business Communication",
    room: "GB103",
    building: "GB",
  },
];

export const availableRooms: AvailableRoom[] = [
  {
    id: "AB108",
    building: "Alpha Building",
    type: "Lecture Room",
    freeFrom: "Now",
    freeUntil: "12:00",
  },
  {
    id: "BB003",
    building: "Beta Building",
    type: "Seminar Room",
    freeFrom: "11:30",
    freeUntil: "16:00",
  },
  {
    id: "LIB205",
    building: "University Library",
    type: "Study Room",
    freeFrom: "Now",
    freeUntil: "18:00",
  },
  {
    id: "DB204",
    building: "Delta Building",
    type: "Project Lab",
    freeFrom: "13:00",
    freeUntil: "15:30",
  },
];

export const recentSearches: string[] = [
  "BB104",
  "Library",
  "Student Centre",
  "AB205",
  "DB104",
];

export const favourites: Favourite[] = [
  {
    id: "library",
    label: "University Library",
    sub: "Phase 2",
  },
  {
    id: "student",
    label: "Student Centre",
    sub: "Phase 2",
  },
  {
    id: "AB205",
    label: "Networking Lab • AB205",
    sub: "Phase 1",
  },
];

export const profile: Profile = {
  name: "John Doe",
  email: "john.doe@student.demo.edu",
  school: "School of Computing",
  programme: "BSc Computer Science",
  year: "Year 4",
};
