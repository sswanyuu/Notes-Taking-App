import { Row, Col, Stack, Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { useState, useMemo } from "react";
import { Tag } from "../App";
import { NoteCardProps as simplifiedNotes } from "./NoteCard";
import { NoteCard } from "./NoteCard";
type NoteListProps = {
  availableTags: Tag[];
  notes: simplifiedNotes[];
};
type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
};
export function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [showEditTagsModal, setShowEditTagsModal] = useState<boolean>(false);
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          //check if every tag in selectedTags is in note.tags
          //every() returns true if every element in the array passes the test
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notes, title, selectedTags]);

  return (
    <>
      <Row className="my-4 align-items-center">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">New Note</Button>
            </Link>
            <Button
              onClick={() => setShowEditTagsModal(true)}
              variant="outline-secondary"
            >
              Edit Tag
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tag</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} md={3} lg={4}>
        {filteredNotes.map((note) => {
          return (
            <Col key={note.id} className="mb-4">
              <NoteCard tags={note.tags} id={note.id} title={note.title} />
            </Col>
          );
        })}
      </Row>
      <EditTagsModal
        show={showEditTagsModal}
        handleClose={() => setShowEditTagsModal(false)}
        availableTags={availableTags}
      />
    </>
  );
}
function EditTagsModal({
  availableTags,
  show,
  handleClose,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => {
              return (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control type="text" value={tag.label} />
                  </Col>
                  <Col xs="auto">
                    <Button variant="outline-danger">&times;</Button>
                  </Col>
                </Row>
              );
            })}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
