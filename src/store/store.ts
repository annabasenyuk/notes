import { configureStore } from '@reduxjs/toolkit';
import notesSlicer from './notes/notesSlice';

export const store = configureStore({
  reducer: {
    notes: notesSlicer
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch