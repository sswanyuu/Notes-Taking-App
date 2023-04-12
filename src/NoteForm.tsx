import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
export function NoteForm() {
  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required />
            </Form.Group>
            <Form.Group controlId="tags">
              <Form.Label>Tag</Form.Label>
              <CreatableReactSelect isMulti />
            </Form.Group>
            <Form.Group controlId="markDown">
              <Form.Label>Content</Form.Label>
              <Form.Control required as="textarea" rows={20} />
            </Form.Group>
            <Stack
              direction="horizontal"
              gap={2}
              className="justify-content-end"
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
