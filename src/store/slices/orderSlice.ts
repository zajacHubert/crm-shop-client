import { Product } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  orderedProducts: Product[];
}

const initialState: OrderState = {
  orderedProducts: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProductToOrder(state, action: PayloadAction<Product>) {
      state.orderedProducts = [...state.orderedProducts, action.payload];
    },
    removeProductFromOrder(state, action: PayloadAction<string>) {
      state.orderedProducts = state.orderedProducts.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addProductToOrder, removeProductFromOrder } = orderSlice.actions;
export default orderSlice.reducer;
