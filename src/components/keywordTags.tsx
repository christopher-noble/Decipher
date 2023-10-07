import { InputTags } from "../utils/inputTags";
import "react-bootstrap-tagsinput/dist/index.css";
import '../css/keywordTags.css'
import { Button, Col, Row } from "react-bootstrap";

const KeywordTags = (props: any) => {
  return (
      <Row className="input-group">
        <Col className="input-area">
          <InputTags
            values={props.tags}
            onTags={(value) => props.setTags(value.values)}
            className="tag-area"
            elementClassName="tag-element"
            placeholder="Type keywords..."
          />
        </Col>
        <Col xs='auto' className="delete-button-area">
          <Button
            className="btn btn-light delete-button"
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

export default KeywordTags;