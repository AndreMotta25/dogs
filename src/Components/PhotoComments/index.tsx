import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { useUserContext } from '../../Hooks/useUserContext';
import PhotoCommentsForm from '../PhotoCommentsForm';
import { Comment } from '../PhotoContent';

type Props = {
    id:string;
    commentsList: Comment[];
    single:boolean
}
const PhotoComments = ({id, commentsList,single }:Props) => {
  const [comments, setComments] = useState(commentsList);
  const commentsSection = useRef<HTMLUListElement|null>(null);
  const {login} = useUserContext();
  
  useEffect(() => {
    if(commentsSection.current){
      // mexendo na propriedade scrollTop posso modificar aonde o scroll vai estar
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [comments,commentsSection])

  return (
    <>
      <ul ref={commentsSection} className={`${styles.comments} ${single ? styles.single:''}`}>
        {comments.map((comment) => 
        <li key={comment.comment_ID}> 
          <b>{comment.comment_author}:</b>
          <span>{comment.comment_content}</span>
        </li>)}
      </ul>
      {login && <PhotoCommentsForm id={id} setComments={setComments} single={single}/>}
    </>
  )
}

export default PhotoComments