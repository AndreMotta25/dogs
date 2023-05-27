import React, { useEffect } from 'react'
import { PHOTOS_GET } from '../../../../api';
import Error from '../../../../Components/Helper/Error';
import Loading from '../../../../Components/Loading';
import useFetch from '../../../../Hooks/useFetch'
import FeedPhotosItem from '../FeedPhotosItem'
import styles from './styles.module.css'
import Photo from '../../../../@types/Photo';

type Props = {
  setModalPhoto: React.Dispatch<React.SetStateAction<Photo| null>>;
  user?:number | string  ;
  page:number;
  setInfinite: React.Dispatch<React.SetStateAction<boolean>>
}

const FeedPhotos = ({user,setModalPhoto,page,setInfinite}:Props) => {
  const {data,error,loading,request} = useFetch();

  useEffect(() => {
    const fetchPhotos = async () => {
        const {url,options} = PHOTOS_GET({page:page,total:6,user:user});
        const {json,response} = await request(url,options)
        console.log(page)
        if(response && response.ok && json.length < 3) {
          setInfinite(false);
        }
    }
    fetchPhotos()
  },[request,user, page,setInfinite])


  if(error) return <Error error={error}/>
  if(loading) return <Loading/>
  return (
    <>
        {data && 
        <ul className={`${styles.feed} animeLeft`}>
            {data.map((photo:any) => <FeedPhotosItem key={photo.id} photo={photo} setModalPhoto={setModalPhoto}/>)}
        </ul>}
    </>
  )
}

export default FeedPhotos