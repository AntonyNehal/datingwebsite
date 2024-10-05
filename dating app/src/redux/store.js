import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import themeReducer from './theme/themeSlice';
import userReducer from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import additionalDetailsReducer from './user/additionaldetailsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  additionalDetails:additionalDetailsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store); // Ensure this line is included
