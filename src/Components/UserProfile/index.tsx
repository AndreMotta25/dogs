import React from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../../Pages/Feed';
import Head from '../Helper/Head/Head';

const UserProfile = () => {
  const {user} = useParams();

  return (
    <section className="container mainSection">
      <Head title={user as string} description='Nome do site Dogs, com o feed de fotos'/>
      <h1 className='title'>{user}</h1>
      <Feed user={user}/>
    </section>
  )
}

export default UserProfile