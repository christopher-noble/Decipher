import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadForm from './components/uploadForm';
import './css/homeContent.css';

const App = () => {
  return (
    <div className="App">
      <div className="homeContent">
      <header>
        <h1>Decipher</h1>
      </header>
        <UploadForm />
      </div>
    </div>
  );
}

export default App;
