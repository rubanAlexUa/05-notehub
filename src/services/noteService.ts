import axios from "axios";
import type { Note } from "../types/note";
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

interface NoteServiceProps {
  query: string;
  page: number;
}

export const fetchNotes = async ({ query, page }: NoteServiceProps) => {
  const res = await axios.get("/notes", {
    params: {
      search: query,
      page,
      perPage: 12,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createNote = async (newTodo: Note) => {
  return axios.post("/notes", newTodo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteNote = async (noteId: string) => {
  return axios.delete(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
