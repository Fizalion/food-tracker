import { useState } from "react";
import CalorieCircle from "./components/CalorieCircle/CalorieCircle";
import FoodInput from "./components/FoodInput/FoodInput";
import FoodList from "./components/FoodList/FoodList";

function App() {
  const [entries, setEntries] = useState([]);

  const totalCalories = entries.reduce((acc, entry) => {
    return acc + entry.calories;
  }, 0);

  function addFoodEntry(entry) {
    setEntries([...entries, entry]);
  }

  return (
    <div>
      <h1>Food Tracker</h1>
      <CalorieCircle totalCalories={totalCalories} />
      <FoodInput addFoodEntry={addFoodEntry} />
      <FoodList entries={entries} />
    </div>
  );
}

export default App;
