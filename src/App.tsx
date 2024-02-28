import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/styles/transcribePageStyles.css';
import HomePage from './pages/homepage';
import TranscribePage from './pages/transcribePage';
import { Route, Routes, useLocation } from 'react-router-dom';
import AboutPage from './pages/aboutPage';
import NavBar from './components/navBar';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const App = () => {
  const location = useLocation();

  const currentYear = new Date().getFullYear();
  return (
    <div className="App">
      <header>
        <NavBar></NavBar>
      </header>
      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={300} classNames="fade">
          <Routes location={location}> 
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/transcribe" element={<TranscribePage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <footer>
        <div className='footer-text'>
          © {currentYear} Decipher. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
