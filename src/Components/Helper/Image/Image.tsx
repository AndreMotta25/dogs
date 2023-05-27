import React, { useState } from 'react'
import styles from './styles.module.css'

type Props = {
    alt: string;
    src:string
}

const Image = ({alt,src}:Props) => {
  const[skeleton, setSkeleton ] = useState(true);

  const handleLoad = (event:React.SyntheticEvent<HTMLImageElement, Event>) =>  {
    if(event.target instanceof HTMLImageElement) {
        event.target.style.opacity =  '1'
        setSkeleton(false)
    }
  }  
  return (
    <div className={styles.wrapper}>
        {skeleton && <div className={styles.skeleton}></div>}
        <img onLoad={handleLoad} className={styles.img} src={src} alt={alt}/>
    </div>
  )
}

export default Image

// onLoad é acioando toda vez que a foto é totalmente carregada