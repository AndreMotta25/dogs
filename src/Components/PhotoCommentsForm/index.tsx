import React, { useState } from 'react'
import {ReactComponent as Send} from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch';
import { COMMENT_POST } from '../../api';
import { Comment } from '../PhotoContent';
import Error from '../Helper/Error';
import styles from './styles.module.css'

type Props = {
    id:string;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>
    single:boolean
}

const PhotoCommentsForm = ({id,setComments,single}:Props) => {
  const [comment, setComment] = useState('');
  const {request, error} = useFetch();
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token') as string;
    const {url, options} =  COMMENT_POST(token,id,{comment})
    const {response,json} = await request(url, options);
    if(response?.ok) {
      setComment('');
      setComments((comments) => [...comments,{...json}])
      console.log(json)
    }
  }  

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${single ? styles.single:''}`}>
        <textarea className={styles.textarea} value={comment} onChange={({target}) => setComment(target.value)} id='comment' name='comment' placeholder='Comente...'/>
        <button className={styles.button}><Send/></button>
        <Error error={error}/>
    </form>
  )
}

export default PhotoCommentsForm