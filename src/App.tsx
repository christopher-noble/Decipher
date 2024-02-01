import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadForm from './components/uploadForm';
import './css/homepage.css';
import './css/loginSelector.css';
import LoginSelector from './components/loginSelector';

const App = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="App">
      <header>
        <div className='logo-area'>
          <a href='/'><img src='./logo-no-background.png' alt='decipher-logo'></img></a>
        </div>
        <div className="login-buttons">
          <LoginSelector />
        </div>
      </header>
      <div className="home-content">
        <div>
          <div className='subheading'>What are you listening for?</div>
          <UploadForm />
        </div>
      </div>
      <footer>
        © {currentYear} Decipher. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;
