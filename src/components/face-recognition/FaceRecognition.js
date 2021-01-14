import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => (
  <div className="center ma">
    <div className="relative mt2">
      <img id="inputImage" src={imageUrl} alt="" width="500px" height="auto" />
      {boxes.map((box, i) => (
        <div
          key={`box-${i + 1}`}
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        />
      ))}
    </div>
  </div>
);

export default FaceRecognition;
