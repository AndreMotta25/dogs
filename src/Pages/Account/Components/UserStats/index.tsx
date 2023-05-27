import React, { useEffect,lazy } from 'react'
import Head from '../../../../Components/Helper/Head/Head'
import useFetch from '../../../../Hooks/useFetch'
import { GET_STATS } from '../../../../api';
import Loading from '../../../../Components/Loading';
import Error from '../../../../Components/Helper/Error';
// import UserStatsGraphs from '../../../../Components/UserStatsGraphs';
const UserStatsGraphs = lazy(() => import('../../../../Components/UserStatsGraphs'))

const UserStats = () => {
  const {data,error,loading,request} = useFetch();

  useEffect(() => {
    const getData = async () => {
      const {url,options} = GET_STATS();
      await request(url, options);
    }
    getData();

  },[request])

  if(loading) return <Loading/>
  if(error) return <Error error={error}/>
  if(data)  return (
    <React.Suspense fallback={<div></div>}>
      <Head title='Estatisticas' description='Nome do site Dogs, com o feed de fotos'/>
      <UserStatsGraphs data={data}/>
    </React.Suspense>
  )
  return null
}

export default UserStats