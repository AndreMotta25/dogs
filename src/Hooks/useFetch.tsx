import React, { useCallback, useState } from 'react'

const useFetch = () => {
  /*
    O uso do data, é para que não criarmos um outro estado atoa para abrigar o json 
  */ 
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const request = useCallback(async (url:string, options:any) => {
    let response;
    let json;
 
    try {
        setError(null);  // se tiver dado um erro antes, já vai resetar
        setLoading(true);
        response = await fetch(url, options);
        json = await response.json();
        if(response.ok === false) throw new Error(json.message);
    }
    catch(err:unknown){
        json = null
        if(err instanceof Error) setError(err.message);
    }
    finally {
        setData(json)
        setLoading(false);
    }
    return {response, json}
  },[])

  return (
    {
        data, loading, error, request
    }
  )
}

export default useFetch

// O useCallback nessa função é muito importante, ela evita um loop em muitos effects