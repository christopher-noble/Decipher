import { InputTags } from "./inputTags";
import "react-bootstrap-tagsinput/dist/index.css";
import './css/keywordTags.css'

const KeywordTags = (props: any) => {
  return (
    <div>
      <br />
      <div className="input-group">
        <div className="input-area">
          <InputTags
            values={props.tags}
            onTags={(value) => props.setTags(value.values)}
            className="tag-area"
            elementClassName="tag-element"
            placeholder="What keywords do you want search?"
          />
        </div>
        <div className="delete-button-area">
          <button
            className="btn btn-outline-dark delete-button"
            type="button"
            data-testid="button-clearAll"
            onClick={() => {
              props.setTags([]);
            }}
          >
            Delete all
          </button>
        </div>
      </div>
    </div>
  );
}

export default KeywordTags;