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
        <h1>Decipher</h1>
      </header>
      <div className="homeContent">
        <UploadForm />
      </div>
    </div>
  );
}

export default App;
