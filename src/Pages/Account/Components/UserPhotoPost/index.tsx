import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PHOTO_POST } from '../../../../api';
import Button from '../../../../Components/Button';
import Error from '../../../../Components/Helper/Error';
import Input from '../../../../Components/Input';
import useFetch from '../../../../Hooks/useFetch';
import useForm from '../../../../Hooks/useForm';
import styles from './styles.module.css'
import Head from '../../../../Components/Helper/Head/Head';

type Img = {
  raw:File,
  preview:string
}

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = useState<Img>({} as Img);
  const {data,error,loading,request} = useFetch();

  const navigate = useNavigate();


  useEffect(() => {
    if(data) navigate('/conta')
  },[data])

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // é feito assim pq tem uma imagem, então o json não vai funcionar
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = localStorage.getItem('token') as string ;
    const {url,options} = PHOTO_POST(token,formData);
    await request(url,options);
    

  }

  const handleImgChange = ({target}:React.ChangeEvent<HTMLInputElement>) => {
    setImg({
      preview: URL.createObjectURL((target.files as FileList)[0]),
      raw:(target.files as FileList)[0]
    })
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
       <Head title='Poste sua fotos' description='Nome do site Dogs, com o feed de fotos'/>
      <form onSubmit={handleSubmit}>
        <Input label='Nome' type='text' name='nome' validation={nome}/>
        <Input label='Peso' type='number' name='peso' validation={peso}/>
        <Input label='Idade' type='number' name='idade' validation={idade}/>
        <input className={styles.file} type="file" name='img' id='img' onChange={handleImgChange}/>
        
        {loading && <Button disabled>Enviando...</Button>}
        {!loading && <Button type='submit'>Enviar</Button>}

        <Error error={error}/>
      </form>
      <div aria-label='preview'>
        {/* Pelo jeito, deixar como backgrund deixar mais facil de cortar e controlar a imagem */}
        <div className={styles.preview} style={{backgroundImage:`url(${img.preview})`}}></div>
      </div>
    </section>
  )
}

export default UserPhotoPost;