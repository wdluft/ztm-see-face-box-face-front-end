import {useState} from 'react';
import Particles from 'react-particles-js';
import './App.css';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import Logo from './components/logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/face-recognition/FaceRecognition';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '865c4f2fbc0d495cb26a0d4fcd11bc68'
});

const particleOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ffffff"
    },
  }
}

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});

  const onInputChange = e => {
    setInput(() => e.target.value);
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  const displayFaceBox = (box) => {
    setBox(() => box);
    console.log(box);
  }

  const onButtonSubmit = () => {
    setImageUrl(() => input);

    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(res => displayFaceBox(calculateFaceLocation(res)))
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <Particles className='particles' params={particleOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
      <FaceRecognition imageUrl={imageUrl} box={box}/>
    </div>
  );
}

export default App;
