import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import LevelSelectScreen from "../screens/LevelSelectScreen";
import GameScreen from "../screens/GameScreen";
import ResultsScreen from "../screens/ResultsScreen";

// PUBLIC_INTERFACE
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/level" element={<LevelSelectScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/results" element={<ResultsScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
