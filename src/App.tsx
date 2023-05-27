import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import {UserStorage} from './Context/UserContext'
import Account from './Pages/Account';
import ProtectedRoute from './Components/Helper/ProtectedRoute';
import Photo from './Components/Photo';
import UserProfile from './Components/UserProfile';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <UserStorage>
          <Header/>
            <main className='AppBody'>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='login/*' element={<Login/>}/>
                <Route path='conta/*' element={<ProtectedRoute><Account/></ProtectedRoute>}/>
                <Route path='foto/:id' element={<Photo/>}/>
                <Route path='perfil/:user' element={<UserProfile/>}/>
                <Route path='*' element={<NotFound/>} />
              </Routes>
            </main>
          <Footer/>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
