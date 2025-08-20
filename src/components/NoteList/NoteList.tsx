import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { deleteNote } from "../../services/noteService";
import { useQueryClient, useMutation } from "@tanstack/react-query";
interface NoteListProps {
  notes: {
    notes: Note[];
    totalPages: number;
  };
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteTodo = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
      console.log("Note was removed");
    },
  });

  const handleDelete = (noteId: string) => {
    deleteTodo.mutate(noteId);
  };
  return (
    <ul className={css.list}>
      {notes.notes.map((noteInfo) => (
        <li className={css.listItem} key={noteInfo.id} id={noteInfo.id}>
          <h2 className={css.title}>{noteInfo.title}</h2>
          <p className={css.content}>{noteInfo.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{noteInfo.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(noteInfo.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
