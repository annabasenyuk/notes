import { createSlice } from '@reduxjs/toolkit'
import { Note } from '../../types/Note'

const notesSlice = createSlice({
  name: 'todos',
  initialState: [] as Note[],
  reducers: {
    noteAddedToStore(state, action) {
      state.push({
        id: action.payload.id,
        title: action.payload.title,
        body: action.payload.body,
      })
    },
    addNote(state, action) {
      state.push(action.payload)
    },
    removeNote(state, action) {
      return state.filter((note) => note.id !== action.payload);
    },
    updateNote(state, action) {
      const index = state.findIndex((todo) => todo.id.toString() === action.payload.id);
      const updatedState = [...state];
      if (updatedState[index]) {
        updatedState[index].title = action.payload.title;
        updatedState[index].body = action.payload.body;
      }
    },
  },
})

export const { noteAddedToStore, addNote, removeNote, updateNote } = notesSlice.actions
export default notesSlice.reducer