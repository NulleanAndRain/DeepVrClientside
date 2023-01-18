import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AuthState {
    token: string;
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

export const { setToken } = bookingSlice.actions;
export default bookingSlice.reducer;