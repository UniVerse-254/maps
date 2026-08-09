import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import HomePage from "@/pages/HomePage";
import SearchPage from "./pages/SearchPage";
import BuildingPage from "./pages/BuildingPage";
import RoomPage from "./pages/RoomPage";
import NavigatePage from "./pages/NavigatePage";
import AvailableRoomsPage from "./pages/AvailableRoomsPage";
import ProfilePage from "./pages/ProfilePage";
import AuthGuard from "./layouts/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "building/:buildingId",
        element: <BuildingPage />,
      },
      {
        path: "room/:roomId",
        element: <RoomPage />,
      },
      {
        path: "navigate/:targetId",
        element: <NavigatePage />,
      },
      {
        path: "available",
        element: <AvailableRoomsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
