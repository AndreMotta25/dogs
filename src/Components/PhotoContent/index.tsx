import React from 'react'
import styles from './styles.module.css'
import Photo from '../../@types/Photo';
import { Link } from 'react-router-dom';
import PhotoComments from '../PhotoComments';
import { useUserContext } from '../../Hooks/useUserContext';
import PhotoDelete from '../PhotoDelete';
import Image from '../Helper/Image/Image';

export type Comment = {
    comment_ID:string;
    comment_author:string;
    comment_content:string;
}

type Props = {
    data:{
        photo:Photo & {title:string; author:string; peso:number; idade:number};
        comments:Comment[];
    };
    single:boolean
}
const PhotoContent = ({data, single}:Props) => {
  const {photo,comments} = data;
  const {user} = useUserContext(); 

  return (
    <div className={`${styles.photo} ${single ? styles.single:''}`}> 
        <div className={styles.img}>
            <Image src={photo.src} alt={photo.title}/>
        </div>
        <div className={styles.details}>
            <div>
                <p className={styles.author}>
                    {user && user.username === photo.author ? <PhotoDelete id={photo.id}/>:
                    <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>}
                    <span className={styles.visualization}>{photo.acessos}</span>
                </p>
                <h1 className='title'>
                    <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
                </h1>
                <ul className={styles.attributes}>
                    <li>{photo.peso} kg</li>
                    <li>{photo.idade} anos</li>
                </ul>
            </div>
        </div>
        <PhotoComments id={photo.id} commentsList={comments} single={single}/>
    </div>
  )
}

export default PhotoContent