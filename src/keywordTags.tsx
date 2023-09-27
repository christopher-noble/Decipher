import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import { useState } from "react";
import './css/keywordTags.css'


const KeywordTags = () => {
  const [state, setState] = useState<any | null>('');
  return (
    <div>
      <br />
      <div className="input-group">
        <div className="input-area">
          <InputTags
            values={state}
            onTags={(value) => setState(value.values)}
            className="tag-area"
            elementClassName="tag-element"
          />
        </div>
        <div className="delete-button-area">
          <button
            className="btn btn-outline-dark"
            type="button"
            data-testid="button-clearAll"
            onClick={() => {
              setState([]);
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