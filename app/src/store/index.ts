import productsSlice from "../store/reducers/products"
import { configureStore } from '@reduxjs/toolkit';


export const reducers = {
  products: productsSlice
}

const store = configureStore({
  reducer: reducers
})
export type RootState = ReturnType<typeof store.getState>;
export default store


