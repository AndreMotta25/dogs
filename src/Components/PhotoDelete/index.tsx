import React, { MouseEventHandler } from 'react'
import styles from './styles.module.css'
import { PHOTO_DELETE } from '../../api'
import useFetch from '../../Hooks/useFetch'

type Props = {
    id:string
}

const PhotoDelete =  ({id}:Props) => {
  const {loading,request } = useFetch();

  const handleClick  = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const token = localStorage.getItem('token')
    if(token) {
        const confirm = window.confirm("Tem certeza que deseja deletar ? ")
        if(confirm) { 
            const {url,options} = PHOTO_DELETE(token,id)
            const {response} = await request(url, options)
            if(response?.ok) window.location.reload();
        }
    }
  }  

  return (
    <>
        {loading ? <button disabled className={styles.delete}>Deletando</button>: <button onClick={handleClick} className={styles.delete}>Deletar</button>}
    </>
  )
}

export default PhotoDelete

// Porque nomear uma função de evento de click com o nome handleClick ? 