import { createSlice } from "@reduxjs/toolkit";
import { Api } from "../api";
import { ICity, IGame, IRoom } from "../types";
import { RootState } from "./store";

interface BookingState {
    currentStep: number,
    city?: ICity,
    room?: IRoom,
    game?: IGame,
    playersCount?: number,
    date?: string,
    time?: string,
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

        rollbackStep(state) {
            const step = state.currentStep;
            state.currentStep--;
            switch (step) {
                case 1: { 
                    state.city = undefined; 
                    Api.setInstanceUrl(undefined);
                    break;
                }
                case 2: state.room = undefined; break;
                default: break;
            }
        },

        clearState(state) {
            state = { currentStep: 0 };
        } 
    }
});

export const getCurrentStep = (state: RootState) => state.bookingReducer.currentStep;
export const getCity = (state: RootState) => state.bookingReducer.city;
export const getRoom = (state: RootState) => state.bookingReducer.room;

export const { increaseStep, setCity, rollbackStep } = bookingSlice.actions;
export default bookingSlice.reducer;