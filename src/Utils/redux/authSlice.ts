import { createSlice } from "@reduxjs/toolkit";
import { ICity, IUser } from "../types";
import { RootState } from "./store";

interface AuthState {
    token: string;
    user?: IUser;
    selectedCity?: ICity;
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
        },
        setUser: (state, action : {payload: IUser}) => {
            state.user = action.payload;
        },
        setSelectedCity(state, action : {payload: ICity|undefined}) {
            state.selectedCity = action.payload;
        }
    }
});

export const getToken = (state: RootState) => state.authReducer.token;
export const getIsAuthorised = (state: RootState) => !!state.authReducer.token;
export const getUser = (state: RootState) => state.authReducer.user;
export const getSelectedCity = (state: RootState) => state.authReducer.selectedCity;


export const { setToken, setUser, setSelectedCity } = bookingSlice.actions;
export default bookingSlice.reducer;