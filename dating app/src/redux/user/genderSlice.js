import { createSlice } from "@reduxjs/toolkit";

const initialGenderState = {
  gender: '', // Default value for gender
};

const genderSlice = createSlice({
  name: 'gender',
  initialState: initialGenderState,
  reducers: {
    setGender: (state, action) => {
      state.gender = action.payload;
    },
  },
});

export const { setGender } = genderSlice.actions;
export const selectGender = (state) => state.gender.gender; // Selector for gender
export default genderSlice.reducer;
