import React from 'react'
import { USER_POST } from '../../../../api'
import Button from '../../../../Components/Button'
import Error from '../../../../Components/Helper/Error'
import Input from '../../../../Components/Input'
import useFetch from '../../../../Hooks/useFetch'
import useForm from '../../../../Hooks/useForm'
import { useUserContext } from '../../../../Hooks/useUserContext'
import Head from '../../../../Components/Helper/Head/Head'

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm();

  const {userLogin} = useUserContext();
  const {loading,error,request} = useFetch();

  const handleSubmit= async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {url,options} = USER_POST({username: username.value,email: email.value,password:password.value});
    const {response,json} = await request(url,options);
    if(response && response.ok)
      userLogin(username.value, password.value);
   
  }
  
  return (
    <section className='animeLeft'>
      <Head title='Crie sua Conta' description='Nome do site Dogs, com o feed de fotos'/>
      <h1 className='title'>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label='Usuario' type='text' name='username' validation={username}/>
        <Input label='Email' type='email' name='email'  validation={email}/>
        <Input label='Senha' type='password' name='password' validation={password}/>
        
        {loading && <Button disabled>Cadastrando...</Button>}
        {!loading && <Button>Cadastrar</Button>}
        <Error error={error}/>
      </form>
    </section>
  )
}

export default LoginCreate