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
      const found = state.orderedProducts.findIndex(
        (product) => product.id === action.payload
      );
      if (found > -1) {
        state.orderedProducts.splice(found, 1);
      }
    },
  },
});

export const { addProductToOrder, removeProductFromOrder } = orderSlice.actions;
export default orderSlice.reducer;
