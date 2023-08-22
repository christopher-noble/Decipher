import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadForm from './uploadForm';
import './css/header.css';
import './css/homeContent.css';

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Decipher Audio</h1>
        <br></br>
        <h5>Accepted Formats:</h5>
        <h6> mp3 | mp4 | wav | flac | ogg | amr | webm</h6>
      </header>
      <div className="homeContent">
        <UploadForm />
      </div>
    </div>
  );
}

export default App;
