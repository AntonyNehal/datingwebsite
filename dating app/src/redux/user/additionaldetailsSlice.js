import { createSlice } from '@reduxjs/toolkit';

const additionalDetailsSlice = createSlice({
  name: 'additionalDetails',
  initialState: {
    firstName: '',
    birthday: '',
    gender: '',
    height: '',
    interests: [],
    submitted: false, // Add submitted flag
  },
  reducers: {
    updateDetails: (state, action) => {
      return { ...state, ...action.payload, submitted: true }; // Mark as submitted
    },
    resetDetails: (state) => {
      return { ...state, submitted: false }; // Reset the submitted flag
    },
  },
});

export const { updateDetails, resetDetails } = additionalDetailsSlice.actions;
export default additionalDetailsSlice.reducer;
