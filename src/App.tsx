import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadForm from './components/uploadForm';
import './css/homepage.css';

const App = () => {
  return (
    <div className="App">
      <header>
        <div className='logo-area'>
          <a href='/'><img src='./logo-no-background.png' alt='decipher-logo'></img></a>
        </div>
      </header>
      <div className="home-content">
        <h4>What's your next insight?</h4>
        <UploadForm />
        <footer>
        </footer>
      </div>
    </div>
  );
}

export default App;
