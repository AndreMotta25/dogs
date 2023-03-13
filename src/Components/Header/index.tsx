import React from 'react'
import { Link } from 'react-router-dom';
import styles from './styles.module.css'
import {ReactComponent as Dogs} from '../../Assets/dogs.svg'

const Header = () => {
  return (
    <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
            <ul className={`${styles.navlist}`}>
                <li>
                    <Link to='/' aria-label='Dogs - Home' className={styles.logo}> 
                        <Dogs/>    
                    </Link> 
                </li>
                <li>
                    <Link to='/login' className={styles.login}>Login / Criar</Link> 
                </li>
            </ul>
        </nav>
    </header> 
  )
}

export default Header;