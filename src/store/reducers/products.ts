import { createSlice } from "@reduxjs/toolkit"

export type Size = {
  width: number;
  height: number;
};

export type Product = {
  id: string;
  imageUrl: string;
  name: string;
  count: number;
  size: Size;
  weight: string;
  comments: string[];
};

export type ProductsState = {
  data: Product[]
}
const initialState: ProductsState = {
  data: []
}
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    remove: (state: ProductsState, action: {payload: string}) => {
      state.data = state.data.filter((item: Product) => item.id !== action.payload)
    },
    setAll: (state: ProductsState, action: {payload: ProductsState['data']}) => {
      state.data = action.payload
    },
    add: (state: ProductsState, action: {payload: Product}) => {
      state.data.push(action.payload)
    },
  },
})
export const {
  remove,
  setAll,
  add,
} = productsSlice.actions
export const getProductsState = (state: ProductsState) => state.data;
export default productsSlice.reducer
