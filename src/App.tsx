import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewNote } from "./NewNote";

export type Note = {
  id: string;
} & NoteData;
export type NoteData = {
  title: string;
  markDown: string;
  tags: Tag[];
};
export type Tag = {
  id: string;
  label: string;
};

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<h1>Home</h1>}></Route>
        <Route path="/new" element={<NewNote />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
        <Route path="/:id">
          <Route index element={<h1>View</h1>}></Route>
          <Route path="edit" element={<h1>Edit</h1>}></Route>
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
