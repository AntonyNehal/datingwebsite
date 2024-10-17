import { createSlice } from '@reduxjs/toolkit';

const additionalDetailsSlice2 = createSlice({
    name: 'additionalDetails2',
    initialState: {
        isLoading: false,
        error: null,
        userDetails: null,
    },
    reducers: {
        uploadStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        uploadSuccess: (state, action) => {
            state.isLoading = false;
            state.userDetails = action.payload;
        },
        uploadFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

// Export actions
export const { uploadStart, uploadSuccess, uploadFailure } = additionalDetailsSlice2.actions;

// Export reducer
export default additionalDetailsSlice2.reducer;
