import React,{createContext, useEffect, useState, useCallback} from 'react'
import { useNavigate } from 'react-router-dom';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from '../../api';

type Token= {
  token:string
}
type User = {
  id:number;
  email:string;
  nome:string;
  username:string;
}
type UserContext = {
  userLogin: (username:string, password:string) => Promise<void>;
  getUser:(token:string) => Promise<void>;
  user:User | null;
  userLogout: () => void;
  error:string | null;
  loading:boolean;
  login:boolean;
}
type Props = {
  children: React.ReactNode
}

const hasToken = (value:unknown):value is Token => {
  if(typeof value === 'object' && value && 'token' in value) return true;
  return false;
}

export const UserContext = createContext({} as UserContext);

const UserStorage = ({children}:Props) => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const userLogout = useCallback( () => {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    localStorage.removeItem('token');
    navigate('/login')
  },[navigate])

  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem('token');
      if(token){
        const {url,options} = TOKEN_VALIDATE_POST(token);
        try {
          setLoading(true);
          const response = (await fetch(url,options))
          if(!response.ok) throw new Error('Token invalido');
          await getUser(token);
        }
        catch(e){
          userLogout();
        } 
        finally {
          setLoading(false);
        }
      }
    }
    autoLogin()
  },[userLogout])

  const getUser = async (token:string) => {
    const {url,options} = USER_GET(token);
    const user = await (await fetch(url,options)).json();
    setData(user);
    setLogin(true);
  }

  const userLogin = async (username:string, password:string) => {
    try{ 
      setError(null);
      setLoading(true);
      const {url,options} = TOKEN_POST({username,password});
      const response = (await fetch(url,options))
      
      if(!response.ok) throw new Error(`Error: ${response.statusText}`);
      
      const responseToken = await response.json();
      
      if(hasToken(responseToken)) {
        localStorage.setItem('token',responseToken.token);
        await getUser(responseToken.token);
        navigate('/')
      }
    }
    catch(e){
      if(e instanceof Error)
        setError(e.message);
      setLogin(false);
    }
    finally {
      setLoading(false);
    }
  }

  
  return (
    <UserContext.Provider value={{userLogin, getUser, user:data, userLogout,loading,login,error}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserStorage }

/*
  Tudo do usuario vai ficar concentrado aqui, login, pegar token
*/ 