import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import DiaryPage from "./pages/DiaryPage/DiaryPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import { selectCalorieGoal } from "./redux/calorieGoal/calorieGoalSlice";
import { selectFoodEntries } from "./redux/foodEntries/foodEntriesSlice";
import { saveCalorieGoal, saveFoodEntries } from "./utils/storage";

function App() {
  const entries = useSelector(selectFoodEntries);
  const calorieGoal = useSelector(selectCalorieGoal);
  useEffect(() => saveFoodEntries(entries), [entries]);
  useEffect(() => saveCalorieGoal(calorieGoal), [calorieGoal]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DiaryPage />} />
        <Route path="/day/:date" element={<DiaryPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
