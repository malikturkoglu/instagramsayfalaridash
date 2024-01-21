import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import SayfaYukleme from './pages/TalepYükleme'
import Signin from './pages/Signin'
import CategoryAdd from './pages/CategoryAdd';
import { auth } from "./firebase"
function App() {
   
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
      <Route exact path="/giris" element={<Signin />} />
        <Route exact path="/" element={auth.currentUser ? <SayfaYukleme /> : <Signin />} />
        <Route exact path="/category" element={<CategoryAdd />} />
        <Route exact path="/sayfa-yukleme" element={<SayfaYukleme />} />
      </Routes>
    </>
  );
}

export default App;
