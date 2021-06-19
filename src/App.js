import React, { Component } from "react";
import './App.css';
import Navigation from "./components/navigation/Navigation"
import Logo from "./components/logo/Logo";
import Rank from "./components/rank/Rank"
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/facerecognition/FaceRecognition"

const app = new Clarifai.App({
  apiKey: "50d30fc447994bb1967c411f32a27af3"
});

const particlesOptions = {
  particles: {
    number: {
      value: 33,
      density: {
        enable: true,
        value_area: 800
      }
    }
    
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: ""
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict( 
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        console.log("error" + err);
      }
    )
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
        params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
