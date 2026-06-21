import { createSlice } from "@reduxjs/toolkit";
import { loadCustomProducts } from "../../utils/storage";

export const customProductsSlice = createSlice({
  name: "customProducts",
  initialState: loadCustomProducts(),
  reducers: {
    addCustomProduct: (state, action) => {
      state.push(action.payload);
    },
    removeCustomProductById: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    replaceCustomProducts: (state, action) => {
      return action.payload;
    },
  },
  selectors: {
    selectCustomProducts: (state) => state,
  },
});

export const {
  addCustomProduct,
  removeCustomProductById,
  replaceCustomProducts,
} = customProductsSlice.actions;
export const { selectCustomProducts } = customProductsSlice.selectors;
