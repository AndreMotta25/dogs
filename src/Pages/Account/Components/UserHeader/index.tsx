import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import UserHeaderNav from '../UserHeaderNav'
import styles from './styles.module.css'

// vai estar dentro de uma seção, por isso o header com o h1 não tem problema;
const UserHeader = () => {
  const {pathname} = useLocation();
  const [title, setTitle] = useState<string | null>(null)
  
  useEffect(() => {
    if(pathname === '/conta/estatisticas')
      setTitle("Estatística");
    else if(pathname === '/conta/postar')
      setTitle("Postar");
    else {
      setTitle("Minha Conta");
    }    
  },[pathname]) 

  return (
    <header className={styles.header}>
      <h1 className='title'>{title}</h1>
      <UserHeaderNav/>
    </header>
  )
}

export default UserHeader