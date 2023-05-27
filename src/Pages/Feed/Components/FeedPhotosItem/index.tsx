import React, { ReactNode } from 'react'
import styles from './styles.module.css'
import Photo from '../../../../@types/Photo'
import Image from '../../../../Components/Helper/Image/Image'

type Props ={
    photo:Photo;
    setModalPhoto: React.Dispatch<React.SetStateAction<Photo| null>>
}


const FeedPhotosItem = ({photo,setModalPhoto}:Props) => {
  
  const handleClick = () => {
    setModalPhoto(photo);
  }

  return (
    <li className={styles.photo} onClick={handleClick}>
        {/* <img src={photo.src} alt={photo.title}/> */}
        <Image src={photo.src} alt={photo.title}/>
        <span className={styles.visualization}>{photo.acessos}</span>
    </li>
  )
}

export default FeedPhotosItem