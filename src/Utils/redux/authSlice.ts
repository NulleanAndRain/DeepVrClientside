import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types";
import { RootState } from "./store";

interface AuthState {
    token: string;
    user?: IUser;
}

const initialState : AuthState = {
    token: ''
};

const bookingSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

export const getToken = (state: RootState) => state.authReducer.token;
export const getIsAuthorised = (state: RootState) => !!state.authReducer.token;
export const getUser = (state: RootState) => state.authReducer.user;

export const { setToken } = bookingSlice.actions;
export default bookingSlice.reducer;