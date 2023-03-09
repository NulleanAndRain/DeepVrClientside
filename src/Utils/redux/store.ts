import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./authSlice";
import bookingReducer from "./bookingSlice";

const rootReducer = combineReducers({
    bookingReducer,
    authReducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
    devTools: !!process.env.NODE_ENV && process.env.NODE_ENV === 'development',
});

export const store = setupStore();

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;
