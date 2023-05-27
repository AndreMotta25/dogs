import React from 'react'
import Input from '../../../../Components/Input'
import Button from '../../../../Components/Button'
import useForm from '../../../../Hooks/useForm'
import useFetch from '../../../../Hooks/useFetch'
import { PASSWORD_LOST } from '../../../../api'
import Error from '../../../../Components/Helper/Error'
import Head from '../../../../Components/Helper/Head/Head'

const LoginPasswordLost = () => {
  const login = useForm('email');
  const {data,error,loading,request} = useFetch()

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(login.validate()) {
      const {url, options} = PASSWORD_LOST({login:login.value, url:'http://localhost:3000/login/perdeu/resetar'});
      await request(url,options);
    }
  }
  
  
  return (
    <section className='animeLeft'>
        <Head title='Perdeu a senha' description='Nome do site Dogs, com o feed de fotos'/>
        <h1 className='title'>
          Perdeu a senha ? 
        </h1>
        {data ?<p style={{color:'#4c1'}}>data</p> :
        <form onSubmit={handleSubmit}>
          <Input label='Email / Usuário' type='text' name='login' validation={login}/>
          {loading ? <Button disabled>Enviando</Button>:<Button>Enviar email</Button> }
        </form>}
        <Error error={error}/>
    </section>
  )
}

export default LoginPasswordLost