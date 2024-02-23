import { TagsHelper } from "../utils/helpers/tagsHelper";
import "react-bootstrap-tagsinput/dist/index.css";
import '../components/styles/tagsStyles.css'
import { Button, Col, Row } from "react-bootstrap";

const Tags = (props: any) => {
  return (
      <Row className="tag-row">
        <Col className="tag-col">
          <TagsHelper
            values={props.tags}
            onTags={(value) => props.setTags(value.values)}
            className="tag-area"
            elementClassName="tag-element"
            placeholder="Type keywords..."
          />
        </Col>
        <Col className="col-auto delete-button-area">
          <Button
            className="btn btn-dark delete-button"
            type="button"
            data-testid="button-clearAll"
            onClick={() => {
              props.setTags([]);
            }}
          >
            Clear All
          </Button>
        </Col>
      </Row>
  );
}

export default Tags;