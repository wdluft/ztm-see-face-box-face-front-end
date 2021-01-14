import React, { useState, useEffect } from 'react';
import FaceRecognition from '../face-recognition/FaceRecognition';
import ImageLinkForm from '../image-link-form/ImageLinkForm';
import Rank from '../rank/Rank';

const Home = ({ user, setUser }) => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([]);

  const resetImageState = () => {
    setInput(() => '');
    setImageUrl(() => '');
    setBoxes(() => []);
  };

  const displayFaceBox = (boxCoords) => {
    setBoxes(() => boxCoords);
  };

  const calculateFaceLocation = (data) => {
    // get all faces
    const faces = data.outputs[0].data.regions;

    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return faces.map((face) => ({
      leftCol: face.region_info.bounding_box.left_col * width,
      topRow: face.region_info.bounding_box.top_row * height,
      rightCol: width - face.region_info.bounding_box.right_col * width,
      bottomRow: height - face.region_info.bounding_box.bottom_row * height,
    }));
  };

  const onPictureSubmit = async () => {
    setImageUrl(() => input);
    setInput(() => '');

    // call clarifai api
    await fetch(`${process.env.REACT_APP_SERVER_URL}/imageurl`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          fetch(`${process.env.REACT_APP_SERVER_URL}/image`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((data) => data.json())
            .then((count) => {
              setUser({ ...user, entries: count });
            })
            .catch((err) => console.log(err));
        }
        displayFaceBox(calculateFaceLocation(res));
      })
      .catch((err) => console.log(err));
  };

  const onInputChange = (e) => {
    setInput(() => e.target.value);
  };

  useEffect(() => resetImageState(), []);

  return (
    <>
      <Rank name={user.name} entries={user.entries} />
      <ImageLinkForm
        onPictureSubmit={onPictureSubmit}
        onInputChange={onInputChange}
        input={input}
      />
      <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
    </>
  );
};

export default Home;
