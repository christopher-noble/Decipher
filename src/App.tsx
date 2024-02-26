import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/styles/transcribePageStyles.css';
import HomePage from './pages/homePage';
import TranscribePage from './pages/transcribePage';
import { Route, Routes } from 'react-router-dom';
import AboutPage from './pages/aboutPage';
import NavBar from './components/navBar';

const App = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="App">
      <header>
        <NavBar></NavBar>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/transcribe" element={<TranscribePage />} />
      </Routes>
      <footer>
        <div className='footer-text'>
          © {currentYear} Decipher. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
