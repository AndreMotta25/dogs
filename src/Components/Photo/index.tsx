import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch';
import { PHOTO_GET } from '../../api';
import Error from '../Helper/Error';
import Loading from '../Loading';
import PhotoContent from '../PhotoContent';
import Head from '../Helper/Head/Head';

const Photo = () => {
  const {id} = useParams();
  const {data,error,loading,request} =  useFetch()  

  useEffect(() => {
    const {url,options} = PHOTO_GET(id as string)
    request(url,options) ;
  },[id, request])

  if(error) return <Error error={error}/>
  if(loading) return <Loading/>
  if(data) return (
    <section className='container mainContainer'>
        <Head title={data.photo.title} description='Nome do site Dogs, com o feed de fotos'/>
        <PhotoContent single={true} data={data}/>
    </section>
  )
  return null
}

export default Photo