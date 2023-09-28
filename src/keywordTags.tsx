import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import { useState } from "react";
import './css/keywordTags.css'


const KeywordTags = (props: any) => {
  // const [tags, setTags] = useState<any | null>('');
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
          />
        </div>
        <div className="delete-button-area">
          <hr/>
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
          <hr/>
        </div>
      </div>
    </div>
  );
}

export default KeywordTags;