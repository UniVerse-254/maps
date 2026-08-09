import { useLocalStorage } from "./useLocalStorage";

export function useCourses() {
  const [courses, setCourses] = useLocalStorage<string[]>("campus_courses", []);

  const addCourse = (courseCode: string) => {
    setCourses((prev) => {
      if (prev.includes(courseCode)) return prev;
      return [...prev, courseCode];
    });
  };

  const removeCourse = (courseCode: string) => {
    setCourses((prev) => prev.filter((c) => c !== courseCode));
  };

  return { courses, addCourse, removeCourse };
}
