import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

const HomePage = lazy(() => import("../pages/HomePage"));
const MovieDetailPage = lazy(() => import("../pages/MovieDetailPage"));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
