import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface BookingState {
    test: string;
}

const initialState : BookingState = {
    test: ''
};

const bookingSlice = createSlice({
    name: 'bookingSlice',
    initialState,
    reducers: {
        setTestField: (state, action) => {
            state.test = action.payload;
        }
    }
});

export const getTestField = (state: RootState) => state.bookingReducer.test;

export const { setTestField } = bookingSlice.actions;
export default bookingSlice.reducer;