import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CustomProductsPage from "./pages/CustomProductsPage/CustomProductsPage";
import DataPage from "./pages/DataPage/DataPage";
import DiaryPage from "./pages/DiaryPage/DiaryPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import { selectCalorieGoal } from "./redux/calorieGoal/calorieGoalSlice";
import { selectCustomProducts } from "./redux/customProducts/customProductsSlice";
import { selectFoodEntries } from "./redux/foodEntries/foodEntriesSlice";
import {
  saveCalorieGoal,
  saveCustomProducts,
  saveFoodEntries,
} from "./utils/storage";

function App() {
  const entries = useSelector(selectFoodEntries);
  const calorieGoal = useSelector(selectCalorieGoal);
  const customProducts = useSelector(selectCustomProducts);

  useEffect(() => saveFoodEntries(entries), [entries]);
  useEffect(() => saveCalorieGoal(calorieGoal), [calorieGoal]);
  useEffect(() => saveCustomProducts(customProducts), [customProducts]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DiaryPage />} />
        <Route path="/day/:date" element={<DiaryPage />} />
        <Route path="/products" element={<CustomProductsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
