function pad2(n) {
  return n < 10 ? "0" + String(n) : String(n);
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

export function getTodayDateKey() {
  const date = new Date();
  return toDateKey(date);
}

function dateKeyToDate(dateKey) {
  const splitDate = dateKey.split("-");
  const year = Number(splitDate[0]);
  const month = Number(splitDate[1]) - 1;
  const day = Number(splitDate[2]);
  return new Date(year, month, day);
}

export function formatDayTitle(dateKey) {
  const date = dateKeyToDate(dateKey);

  // встроенный форматтер дат
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
