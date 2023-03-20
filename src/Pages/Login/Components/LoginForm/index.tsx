import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TOKEN_POST, USER_GET } from '../../../../api';
import Button from '../../../../Components/Button';
import Input from '../../../../Components/Input';
import useForm from '../../../../Hooks/useForm';
import { useUserContext } from '../../../../Hooks/useUserContext';




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

  

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <Input label='Usuário' name='username'type='text' validation={username}/>
        <Input label='Senha' name='password' type='password' validation={password}/>

        {(loading && <Button disabled type='submit'>Carregando...</Button>) || <Button type='submit'>Entrar</Button>}
        
        {error && <p>error</p>}
      </form>

      <Link to='/login/criar'>Cadastro</Link>
    </section>
  )
}

export default LoginForm