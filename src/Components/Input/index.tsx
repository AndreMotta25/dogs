import React, { InputHTMLAttributes } from 'react'
import styles from './styles.module.css'

type validation = {
  value:string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  validate: (value:string) => boolean,
  onBlur: () => boolean,
  error:string | null
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label:string;
    name:string;
    error?:string | null;
    validation?: validation
}

const Input = ({label, name, validation, ...rest}:Props) => {
  return (
    <div className={styles.wrapper}>
        <label htmlFor={name} className={styles.label}>{label}</label>
        <input {...rest} value={validation?.value} 
        onChange={validation?.onChange} 
        onBlur={validation?.onBlur} id={name} name={name} className={styles.input}/>
        {validation?.error && <p className={styles.error}>{validation?.error}</p>}
    </div>
    
  )
}

export default Input