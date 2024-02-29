import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/styles/uploadPageStyles.css';
import HomePage from './pages/homepage';
import UploadPage from './pages/uploadPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import LibraryPage from './pages/libraryPage';
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
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/upload" element={<UploadPage />} />
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
