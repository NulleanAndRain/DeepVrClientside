import { createSlice } from "@reduxjs/toolkit";
import { Api } from "../api";
import { IBookingCredentials, ICity, IGame, IRoom } from "../types";
import { RootState } from "./store";

interface BookingState {
  currentStep: number;
  city?: ICity;
  room?: IRoom;
  game?: IGame;
  playersCount?: number;
  date?: string;
  time?: string;
  credentials?: IBookingCredentials;
  isFinished: boolean;
}

const initialState: BookingState = {
  currentStep: 0,
  isFinished: false,
};

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    increaseStep(state) {
      state.currentStep++;
    },

    setStep(state, action) {
      state.currentStep = action.payload;
    },

    setCity(state, action) {
      state.city = action.payload;
      Api.setInstanceUrl(state.city?.code);
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
      state.credentials = action.payload;
    },

    decreaseStep(state) {
      state.currentStep--;
      if (state.currentStep < 0) state.currentStep = 0;
    },

    clearState(state) {
      return { 
        currentStep: state.currentStep, 
        isFinished: false, 
      };
    },

    setIsFinished(state, action) {
      state.isFinished = action.payload;
    }
  },
});

export const getCurrentStep = (state: RootState) =>
  state.bookingReducer.currentStep;
export const getCity = (state: RootState) => state.bookingReducer.city;
export const getRoom = (state: RootState) => state.bookingReducer.room;
export const getGame = (state: RootState) => state.bookingReducer.game;
export const getPlayersCount = (state: RootState) =>
  state.bookingReducer.playersCount;
export const getDate = (state: RootState) => state.bookingReducer.date;
export const getTime = (state: RootState) => state.bookingReducer.time;
export const getCredentials = (state: RootState) =>
state.bookingReducer.credentials;
export const getIsFinished = (state: RootState) => state.bookingReducer.isFinished;

export const getMaxStep = (state: RootState) => {
  const r = state.bookingReducer;
  return ( 
    r.city ?
      r.room?
        r.game?
          r.playersCount ?
            r.date ? 
              r.time ? 
                r.credentials ? 
                7 :
                6
              : 5
            : 4
          : 3
        : 2
      :1
    : 0);
};

export const {
  increaseStep,
  setCity,
  setRoom,
  setDate,
  setGame,
  setTime,
  setPlayersCount,
  setCredentials,
  clearState,
  decreaseStep,
  setStep,
  setIsFinished
} = bookingSlice.actions;
export default bookingSlice.reducer;
