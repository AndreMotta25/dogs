import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../../Components/Button';
import Error from '../../../../Components/Helper/Error';
import Input from '../../../../Components/Input';
import useForm from '../../../../Hooks/useForm';
import { useUserContext } from '../../../../Hooks/useUserContext';
import styles from './styles.module.css'
import stylesBtn from '../../../../Components/Button/styles.module.css'
import Head from '../../../../Components/Helper/Head/Head';


const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const {userLogin,error,loading} = useUserContext();

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  } 
  console.log(error)
  return (
    
    <section className='animeLeft'>
      <Head title='Login' description='Nome do site Dogs, com o feed de fotos'/>
      <h1 className='title'>Login</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label='Usuário' name='username'type='text' validation={username}/>
        <Input label='Senha' name='password' type='password' validation={password}/>
        
        {(loading && <Button disabled type='submit'>Carregando...</Button>) || <Button type='submit'>Entrar</Button>}
       
        <Error error={error}/>
      </form>
      <Link to='/login/perdeu' className={styles.perdeu}>Perdeu a Senha ? </Link>

      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta ? Cadastre-se no site.</p>

        <Link to='/login/criar' className={stylesBtn.button}>Cadastro</Link>
      </div>

      
    </section>
  )
}

export default LoginForm