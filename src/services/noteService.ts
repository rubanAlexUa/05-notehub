import axios from "axios";
import type { Note, NoteFormValues } from "../types/note";
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

interface NoteServiceProps {
  query: string;
  page: number;
}

interface NoteResponce {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({ query, page }: NoteServiceProps) => {
  const res = await axios.get<NoteResponce>("/notes", {
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

export const createNote = async (newTodo: NoteFormValues): Promise<Note> => {
  const res = await axios.post<Note>("/notes", newTodo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
