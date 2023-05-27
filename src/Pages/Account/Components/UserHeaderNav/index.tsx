import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useUserContext } from '../../../../Hooks/useUserContext'
import {ReactComponent as MinhasFotos} from '../../../../Assets/feed.svg';
import {ReactComponent as Estatisticas} from '../../../../Assets/estatisticas.svg';
import {ReactComponent as AdicionarFoto} from '../../../../Assets/adicionar.svg';
import {ReactComponent as Sair} from '../../../../Assets/sair.svg'
import styles from './styles.module.css'
import useMedia from '../../../../Hooks/useMedia';

const UserHeaderNav = () => {
  const {userLogout} = useUserContext()
  const mobile = useMedia('(max-width: 40rem)'); // é usado para gerenciar as classes. 
  const [mobileMenu, setMobileMenu] = useState(false)
  const {pathname} = useLocation()  

  useEffect(() => {
    setMobileMenu(false);
  },[pathname])
  return (
    <>
    {mobile && <button aria-label='Menu' className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`} onClick={() => setMobileMenu(mobileMenu => !mobileMenu) }></button>}
    <nav className={`${mobile ? styles.navMobile:styles.nav} ${mobileMenu && styles.navMobileActive}`}>
        <NavLink to="/conta" end>
            <MinhasFotos/>
            {mobile && 'Minhas fotos'}
        </NavLink>
        <NavLink to="/conta/estatisticas">
            <Estatisticas/>
            {mobile && 'Estatisticas'}
        </NavLink>
        <NavLink to="/conta/postar">
            <AdicionarFoto/>
            {mobile && 'Adicionar Foto'}
        </NavLink>
        <button onClick={userLogout}>
            <Sair/>
            {mobile && 'Sair'}
        </button>
    </nav>
    </>
  )
}

export default UserHeaderNav