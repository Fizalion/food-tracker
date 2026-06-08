export type QuickEntryParseResult = {
  titleText: string;
  grams: number | null;
};

export type QuickEntryUnit = "g" | "kg" | "ml" | "l" | "piece" | null;

export const parseQuickEntry = (inputText: string): QuickEntryParseResult => {
  const trimmedInput = inputText.trim();
  if (!trimmedInput) return { titleText: "", grams: null };

  const gramsMatch = trimmedInput.match(
    /(\d+(?:[.,]\d+)?)\s*(г|гр|грамм|грамма|граммов|кг|мл|л|шт|штук)?\.?/i,
  );
  if (gramsMatch) {
    let unit: QuickEntryUnit = null;

    const gramsText = gramsMatch[0];
    const gramsValue = gramsMatch[1];
    const unitText = gramsMatch[2] ? gramsMatch[2].toLowerCase() : "";

    switch (unitText) {
      case "г":
      case "гр":
      case "грамм":
      case "грамма":
      case "граммов":
        unit = "g";
        break;

      case "кг":
        unit = "kg";
        break;

      case "мл":
        unit = "ml";
        break;

      case "л":
        unit = "l";
        break;

      case "шт":
      case "штук":
        unit = "piece";
        break;
    }

    const grams = Number(gramsValue.replace(",", "."));
    const normalizedGrams = unit === "kg" ? grams * 1000 : grams;

    const titleText = trimmedInput
      .replace(gramsText, "")
      .replace(/\s+/g, " ")
      .trim();
    return { titleText, grams: normalizedGrams };
  }

  return { titleText: trimmedInput, grams: null };
};
