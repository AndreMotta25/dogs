import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUserContext } from '../../Hooks/useUserContext';
import LoginCreate from './Components/LoginCreate';
import LoginForm from './Components/LoginForm';
import LoginPasswordLost from './Components/LoginPasswordLost';
import LoginPasswordReset from './Components/LoginPasswordReset';

const Login = () => {
  const {login} = useUserContext();
  return (
    <div>
      {login && <Navigate to='/conta'/>}
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='criar' element={<LoginCreate/>}/>
        <Route path='perdeu' element={<LoginPasswordLost/>}/>
        <Route path='resetar' element={<LoginPasswordReset/>}/>
      </Routes>
    </div>
  )
}

export default Login;