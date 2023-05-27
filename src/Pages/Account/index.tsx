import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Feed from '../Feed'
import UserHeader from './Components/UserHeader'
import UserPhotoPost from './Components/UserPhotoPost'
import UserStats from './Components/UserStats'
import { useUserContext } from '../../Hooks/useUserContext'
import NotFound from '../NotFound'
import Head from '../../Components/Helper/Head/Head'

const Account = () => {
  const {user} = useUserContext()
  return (
    <section className='container'>
      <Head title='Minha conta' description='Nome do site Dogs, com o feed de fotos'/>
      <UserHeader/>
      <Routes>
        <Route path='/' element={<Feed user={user?.id}/>}/> 
        <Route path='/postar' element={<UserPhotoPost/>}/> 
        <Route path='/estatisticas' element={<UserStats/>}/> 
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </section>
  )
}

export default Account

/*
  Tecnicamente, só é possivel acessar aqui, caso o usuario já esteja logado. Deve ser por isso que ele não usou 
  o contexto aqui.
*/ 