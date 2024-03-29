import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";
type NoteFormProps = {
  onSubmit: (note: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;
export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  tags = [],
  markDown = "",
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = titleRef.current!.value;
    const markDown = markDownRef.current!.value;
    onSubmit({ title: title, markDown: markDown, tags: selectedTags });
    navigate("..");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tag</Form.Label>
              <CreatableReactSelect
                value={selectedTags.map((tag) => {
                  return { value: tag.id, label: tag.label };
                })}
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label: label };
                  onAddTag(newTag);
                  setSelectedTags((prevTags) => [...prevTags, newTag]);
                }}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { id: tag.value, label: tag.label };
                    })
                  );
                }}
                isMulti
                options={availableTags.map((tag) => {
                  return { value: tag.id, label: tag.label };
                })}
              />
            </Form.Group>
          </Col>
          <Form.Group controlId="markDown">
            <Form.Label>Content</Form.Label>
            <Form.Control
              required
              ref={markDownRef}
              as="textarea"
              rows={20}
              defaultValue={markDown}
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
        </Row>
      </Stack>
    </Form>
  );
}
