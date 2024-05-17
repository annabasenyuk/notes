import { Note } from "../types/Note";
import { notes } from "../utils/fetchNotes";

export const getNotes = () => {
  return notes.get<Note[]>(`/posts`);
};

export const deleteNotes = (postsId: number | string) => {
  return notes.delete(`/posts/${postsId}`);
};

export const addNotes = (newPost: Omit<Note, 'id'>) => {
  return notes.post('/posts', newPost);
};

export const updateNotes = (postsId: number | string, post:Omit <Note, 'id'>) => {
  return notes.patch<Note>(`/posts/${postsId}`, post);
};