import React, { FormEvent, useEffect, useState } from 'react'
import Input from '../../../../Components/Input';
import useForm from '../../../../Hooks/useForm';
import Button from '../../../../Components/Button';
import { PASSWORD_RESET } from '../../../../api';
import useFetch from '../../../../Hooks/useFetch';
import Error from '../../../../Components/Helper/Error';
import { useNavigate } from 'react-router-dom';
import Head from '../../../../Components/Helper/Head/Head';

const LoginPasswordReset = () => {
  const [login, setLogin] = useState('');
  const [key, setKey] = useState('')
  const password = useForm();
  const {data,error,loading,request} = useFetch()
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login')

    if(key) setKey(key);
    if(login) setLogin(login);

  },[])

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(password.validate()) {
      const {options,url} = PASSWORD_RESET({login: login, key:key,password:password.value});
      const {json,response} = await request(url,options);
      if(response?.ok) navigate('/login')
    }

  }

  return (
    <section className='animeLeft'>
      <Head title='Reseta a senha' description='Nome do site Dogs, com o feed de fotos'/>
      <h1 className='title'>Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input label='Nova Senha' type='password' name='password' validation={password}/>
        {loading ? <Button disabled>Resetando...</Button>:<Button>Resetar</Button> }
      </form>
      <Error error={error}/>
    </section>
  )
}

export default LoginPasswordReset