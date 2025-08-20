import c from "./NoteForm.module.css";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { FormikHelpers } from "formik";
import { nanoid } from "nanoid";

import type { Note } from "../../types/note";

interface NoteFormProps {
  onClose: () => void;
  onSumbit: (values: Note, actions: FormikHelpers<Note>) => void;
}
export default function NoteForm({ onClose, onSumbit }: NoteFormProps) {
  const initialValues: Note = {
    id: nanoid(),
    title: "",
    content: "",
    tag: "",
  };

  const OrderFormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title is too long")
      .required("Title is required"),
    content: Yup.string().max(500, "Content is too long"),
    tag: Yup.string().oneOf([
      "Todo",
      "Work",
      "Personal",
      "Meeting",
      "Shopping",
    ]),
  });
  return (
    <div className={c.backdrop} role="dialog" aria-modal="true">
      <div className={c.modal}>
        <Formik
          initialValues={initialValues}
          validationSchema={OrderFormSchema}
          onSubmit={onSumbit}
        >
          <Form className={c.form}>
            <div className={c.formGroup}>
              <label htmlFor="title">Title</label>
              <Field id="title" type="text" name="title" className={c.input} />
              <ErrorMessage component="span" name="title" className={c.error} />
            </div>

            <div className={c.formGroup}>
              <label htmlFor="content">Content</label>
              <Field
                as="textarea"
                id="content"
                name="content"
                rows={8}
                className={c.textarea}
              />
              <ErrorMessage
                component="span"
                name="content"
                className={c.error}
              />
            </div>

            <div className={c.formGroup}>
              <label htmlFor="tag">Tag</label>
              <Field as="select" id="tag" name="tag" className={c.select}>
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <ErrorMessage component="span" name="tag" className={c.error} />
            </div>

            <div className={c.actions}>
              <button
                type="button"
                className={c.cancelButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className={c.submitButton} disabled={false}>
                Create note
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
