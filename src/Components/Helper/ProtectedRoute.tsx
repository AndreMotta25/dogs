import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../Hooks/useUserContext'

type Props = {
    children:JSX.Element
}
const ProtectedRoute = ({children}:Props) => {
  const { login } = useUserContext();  
  console.log(login)
  return login ? children : <Navigate to='/login'/>
}

export default ProtectedRoute