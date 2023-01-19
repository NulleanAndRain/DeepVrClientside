import { createSlice } from "@reduxjs/toolkit";
import { Api } from "../api";
import { IBookingCredentials, ICity, IGame, IRoom } from "../types";
import { RootState } from "./store";

interface BookingState {
    currentStep: number,
    city?: ICity,
    room?: IRoom,
    game?: IGame,
    playersCount?: number,
    date?: string,
    time?: string,
    credentials?: IBookingCredentials,
}

const initialState : BookingState = {
    currentStep: 0,
};

const bookingSlice = createSlice({
    name: 'bookingSlice',
    initialState,
    reducers: {
        increaseStep(state) {
            state.currentStep++;
        },

        setCity(state, action) {
            state.city = action.payload;
            Api.setInstanceUrl(
                `https://${state.city?.code}/${Api.globalUrl?.replace('https://', '')}`
            )
        },

        setRoom(state, action) {
            state.room = action.payload;
        },

        setGame(state, action) {
            state.game = action.payload;
        },
        setPlayersCount(state, action) {
            state.playersCount = action.payload;
        },
        setDate(state, action) {
            state.date = action.payload;
        },
        setTime(state, action) {
            state.time = action.payload;
        },

        setCredentials(state, action) {
            state.credentials = action.payload
        },

        decreaseStep(state) {
            switch (state.currentStep) {
                case 1: { 
                    state.city = undefined; 
                    Api.setInstanceUrl(undefined);
                    break;
                }
                case 2: state.room = undefined; break;
                default: break;
            }
            state.currentStep--;
            if (state.currentStep < 0) state.currentStep = 0;
        },

        clearState() {
            return { currentStep: 0 };
        } 
    }
});

export const getCurrentStep = (state: RootState) => state.bookingReducer.currentStep;
export const getCity = (state: RootState) => state.bookingReducer.city;
export const getRoom = (state: RootState) => state.bookingReducer.room;
export const getPlayersCount = (state: RootState) => state.bookingReducer.playersCount;
export const getDate = (state: RootState) => state.bookingReducer.date;
export const getTime = (state: RootState) => state.bookingReducer.time;
export const getCredentials = (state: RootState) => state.bookingReducer.credentials;

export const { increaseStep, setCity, decreaseStep } = bookingSlice.actions;
export default bookingSlice.reducer;