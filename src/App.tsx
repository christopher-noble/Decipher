import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/styles/homepageStyles.css';
import Homepage from './pages/homepage';

const App = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="App">
      <Homepage />
      <footer>
        <div className='footer-text'>
          © {currentYear} Decipher. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
