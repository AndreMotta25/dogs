import React, {useEffect, useState} from 'react'
import FeedModal from './Components/FeedModal'
import FeedPhotos from './Components/FeedPhotos'
import Photo from '../../@types/Photo';

type Props = {
  user?: number | string | undefined
}
const Feed = ({user = 0}:Props) => {
  const [modalPhoto, setModalPhoto] = useState<Photo | null>(null);
  const [pages, setPages] = useState([1]);
  const [infinite, setInfinite] = useState(true);

  useEffect(() => {
    let wait = false
    const infiniteScroll = () => {
      if(infinite) {
        // pega a posição da barra de rolagem
        const scroll = window.scrollY;

        const height = document.body.offsetHeight - window.innerHeight;

        if(scroll > height * 0.75 && !wait) {
          setPages(pages => [...pages, pages.length + 1]);
          wait = true
          setTimeout(() => {
            wait = false;
          },500)
        }
      }
    }

    // wheel é a rodinha do mouse
    window.addEventListener('wheel',infiniteScroll);
    window.addEventListener('scroll',infiniteScroll);
    return () => {
      window.removeEventListener('wheel',infiniteScroll);
      window.removeEventListener('scroll',infiniteScroll);
    }
  },[infinite])

  return (
    <div>
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto}/>}
      {pages.map(page => <FeedPhotos user={user} page={page} key={page} setModalPhoto={setModalPhoto} setInfinite={setInfinite}/>)}
      {/* <FeedPhotos user={user} page='1' setModalPhoto={setModalPhoto}/> */}
    </div>
  )
}

export default Feed