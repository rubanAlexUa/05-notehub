export interface Note {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export interface NoteListResponce {
  notes: Note[];
  totalPages: number;
}

export interface NoteListProps {
  notes: Note[];
}
