import React, { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.css'


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children:React.ReactNode
}

const Button = ({children, ...rest}:Props) => {
  return (
    <button {...rest} className={styles.button} >{children}</button>
  )
}

export default Button