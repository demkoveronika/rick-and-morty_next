import { combineSlices, configureStore } from '@reduxjs/toolkit';
import charactersReducer from '@/features/characters';
import locationsReducer from '@/features/locations';

const rootReducer = combineSlices({
  characters: charactersReducer,
  locations: locationsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;