import type { FoodEntry } from "../types/foodEntry";
import { getCalorieGoalSummary } from "./calorieGoal";
import { dateKeyToDate, toDateKey } from "./date";
import { getEntriesByDate, getTotalCalories } from "./foodEntries";

type WeekDayStats = {
  date: string;
  totalCalories: number;
  remaining: number;
  exceeded: number;
  progressPercent: number;
  consumedPercent: number;
  status: "under" | "done" | "exceeded";
};

type WeekStats = {
  days: WeekDayStats[];
  totalCalories: number;
  averageCalories: number;
  daysUnderGoal: number;
  daysDoneGoal: number;
  daysExceededGoal: number;
};

export const getWeekStats = (
  entries: FoodEntry[],
  calorieGoal: number,
  selectedDate: string,
): WeekStats => {
  const dateArr: WeekDayStats[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = dateKeyToDate(selectedDate);
    date.setDate(date.getDate() - i);

    const dateKey = toDateKey(date);
    const dayEntries = getEntriesByDate(entries, dateKey);
    const totalCalories = getTotalCalories(dayEntries);

    const { remaining, exceeded, progressPercent, consumedPercent, status } =
      getCalorieGoalSummary(totalCalories, calorieGoal);

    dateArr.push({
      date: dateKey,
      totalCalories,
      remaining,
      exceeded,
      progressPercent,
      consumedPercent,
      status,
    });
  }

  const weeklyTotalCalories = dateArr.reduce((acc, day) => {
    return acc + day.totalCalories;
  }, 0);

  return {
    days: dateArr,
    totalCalories: weeklyTotalCalories,
    averageCalories: Math.round(weeklyTotalCalories / 7),
    daysUnderGoal: dateArr.filter((day) => day.status === "under").length,
    daysDoneGoal: dateArr.filter((day) => day.status === "done").length,
    daysExceededGoal: dateArr.filter((day) => day.status === "exceeded").length,
  };
};
