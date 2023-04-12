import { useRef, useState } from "react";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";
type NoteFormProps = {
  onSubmit: (note: NoteData) => void;
};
export function NoteForm({ onSubmit }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = titleRef.current!.value;
    const markDown = markDownRef.current!.value;
    onSubmit({ title: title, markDown: markDown, tags: [] });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
            <Form.Group controlId="tags">
              <Form.Label>Tag</Form.Label>
              <CreatableReactSelect
                value={selectedTags.map((tag) => {
                  return { value: tag.id, label: tag.label };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { id: tag.value, label: tag.label };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
            <Form.Group controlId="markDown">
              <Form.Label>Content</Form.Label>
              <Form.Control
                required
                ref={markDownRef}
                as="textarea"
                rows={20}
              />
            </Form.Group>
            <Stack
              direction="horizontal"
              gap={2}
              className="mt-4 justify-content-end"
            >
              <Button variant="primary" type="submit">
                Save
              </Button>
              <Link to="..">
                <Button variant="outline-secondary" type="reset">
                  Cancel
                </Button>
              </Link>
            </Stack>
          </Col>
        </Row>
      </Stack>
    </Form>
  );
}
