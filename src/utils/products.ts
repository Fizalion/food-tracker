import type { Product } from "../types/product";

export const findProductsByTitle = (
  products: Product[],
  searchText: string,
  maxResults: number = 5,
): Product[] => {
  const searchValue = searchText.trim().toLowerCase();
  const suggestedProducts = searchValue
    ? products
        .filter((product) => {
          const isProductMatched = product.title
            .toLowerCase()
            .includes(searchValue);
          return isProductMatched;
        })
        .slice(0, maxResults)
    : [];
  return suggestedProducts;
};
