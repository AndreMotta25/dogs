import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUserContext } from '../../Hooks/useUserContext';
import LoginCreate from './Components/LoginCreate';
import LoginForm from './Components/LoginForm';
import LoginPasswordLost from './Components/LoginPasswordLost';
import LoginPasswordReset from './Components/LoginPasswordReset';
import styles from './styles.module.css'
import NotFound from '../NotFound';

const Login = () => {
  const {login} = useUserContext();
  
  if(login === true) return <Navigate to='/conta'/>
  
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path='/' element={<LoginForm/>}/>
          <Route path='criar' element={<LoginCreate/>}/>
          <Route path='perdeu' element={<LoginPasswordLost/>}/>
          <Route path='resetar' element={<LoginPasswordReset/>}/>
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
    </section>
  )
}

export default Login;