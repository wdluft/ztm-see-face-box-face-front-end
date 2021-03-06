import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit, input }) => (
  <div>
    <p className="f3">
      This Magic Brain will detect faces in your pictures. Give it a try!
    </p>
    <div className="center">
      <div className="pa4 br3 shadow-5 form center">
        <input
          type="text"
          name=""
          id=""
          className="f4 pa2 w-70 center"
          onChange={onInputChange}
          value={input}
        />
        <button
          className="w-30 grow f4 link ph3 pv2 dib white pointer detectBtn"
          onClick={onPictureSubmit}
          type="button"
        >
          Detect
        </button>
      </div>
    </div>
  </div>
);

export default ImageLinkForm;
