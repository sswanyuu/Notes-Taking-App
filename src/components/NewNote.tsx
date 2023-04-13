import { NoteForm } from "../components/NoteForm";
import { NoteData, Tag } from "../App";
type newNoteProps = {
  onSubmit: (note: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};
export function NewNote({ onSubmit, onAddTag, availableTags }: newNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
