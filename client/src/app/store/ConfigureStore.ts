// import { createStore } from "redux";
// import CounterReducer from "../../features/contact/CounterReducer";

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../features/basket/BasketSlice";
import { catalogSlice } from "../../features/catalog/CatalogSlice";
import { counterSlice } from "../../features/contact/CounterSlice";

// export function ConfigureStore() {
//   return createStore(CounterReducer);
// }

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    basket: basketSlice.reducer,
    catalog: catalogSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
