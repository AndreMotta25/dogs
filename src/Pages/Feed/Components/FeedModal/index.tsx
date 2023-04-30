import React, { useEffect, MouseEvent } from 'react'
import styles from './styles.module.css'
import useFetch from '../../../../Hooks/useFetch'
import { PHOTO_GET } from '../../../../api'
import Photo from '../../../../@types/Photo'
import Error from '../../../../Components/Helper/Error'
import Loading from '../../../../Components/Loading'
import PhotoContent from '../../../../Components/PhotoContent'

type Props = {
  photo: Photo;
  setModalPhoto: React.Dispatch<React.SetStateAction<Photo| null>>
}

const FeedModal = ({photo,setModalPhoto}:Props) => {
  const {data, error, loading, request} = useFetch()
  
  useEffect(() => {
    const {url, options} = PHOTO_GET(photo.id);
    request(url,options)
  },[photo,request])

  const handleOutsideClick = (event:MouseEvent) => {
    if(event.target === event.currentTarget && event.currentTarget instanceof HTMLElement) {
      setModalPhoto(null)
    }

    console.log(event.currentTarget)
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error}/>}
      {loading && <Loading/>}
      {data && <PhotoContent single={false} data={data}/>}
    </div>
  )
}

export default FeedModal