import c from "./App.module.css";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { FormikHelpers } from "formik";
import { useDebouncedCallback } from "use-debounce";

import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";

import { fetchNotes, createNote } from "../../services/noteService";
import type { Note } from "../../types/note";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const { data } = useQuery({
    queryKey: ["note", query, page],
    queryFn: () => fetchNotes({ query, page }),
  });

  const queryClient = useQueryClient();

  const createTodo = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
      console.log("New ToDo added");
    },
  });

  function onClose() {
    setIsModalOpened(false);
  }
  const handleSumbit = (values: Note, actions: FormikHelpers<Note>) => {
    console.log(values);
    createTodo.mutate(values);
    actions.resetForm();
  };

  const totalPages = data?.totalPages ?? 0;

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      setPage(1);
    },
    1000
  );

  return (
    <div className={c.app}>
      <header className={c.toolbar}>
        <SearchBox query={query} handleChange={handleChange} />
        {data && totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            changePage={setPage}
          />
        )}
        <button className={c.button} onClick={() => setIsModalOpened(true)}>
          Create note +
        </button>
      </header>
      {data && <NoteList notes={data}></NoteList>}
      {isModalOpened && (
        <Modal onClose={onClose}>
          <NoteForm onClose={onClose} onSumbit={handleSumbit}></NoteForm>
        </Modal>
      )}
    </div>
  );
}
