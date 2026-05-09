import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import DiaryPage from "./pages/DiaryPage/DiaryPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import { selectFoodEntries } from "./redux/foodEntries/foodEntriesSlice";
import { saveFoodEntries } from "./utils/storage";

function App() {
  const entries = useSelector(selectFoodEntries);
  useEffect(() => saveFoodEntries(entries), [entries]);

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
