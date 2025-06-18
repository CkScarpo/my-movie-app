import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

const HomePage = lazy(() => import("../pages/HomePage"));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};
