type CalorieGoalStatus = "under" | "done" | "exceeded";

export const getCalorieGoalSummary = (
  totalCalories: number,
  calorieGoal: number,
): {
  isExceeded: boolean;
  progressPercent: number;
  remaining: number;
  exceeded: number;
  consumedPercent: number;
  exceededPercent: number;
  status: CalorieGoalStatus;
} => {
  const diff = calorieGoal - totalCalories;
  const remaining = Math.max(calorieGoal - totalCalories, 0);
  const exceeded = Math.max(totalCalories - calorieGoal, 0);
  const isExceeded = diff < 0;
  let progressPercent = 0;
  let consumedPercent = 0;
  let exceededPercent = 0;
  let status: CalorieGoalStatus = "under";

  if (calorieGoal > 0) {
    consumedPercent = Math.round((totalCalories / calorieGoal) * 100);
    exceededPercent = Math.round((exceeded / calorieGoal) * 100);
    progressPercent = Math.min(consumedPercent, 100);
  }

  if (totalCalories < calorieGoal) status = "under";
  if (totalCalories === calorieGoal) status = "done";
  if (totalCalories > calorieGoal) status = "exceeded";

  return {
    isExceeded,
    progressPercent,
    remaining,
    exceeded,
    consumedPercent,
    exceededPercent,
    status,
  };
};
