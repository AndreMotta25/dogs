export const API_URL = 'https://dogsapi.origamid.dev/json/';

// Vamos exportar uma função para cada endpoint da aplicação, assim todos os endpoints ficarão concentrados aqui.

type Login = {
    username:string;
    password:string;
}
export function TOKEN_POST(body:Login) {
    return {
        url:API_URL + 'jwt-auth/v1/token',
        options: {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function USER_GET(token:string) {
    return {
        url:API_URL + 'api/user',
        options: {
            method:'GET',
            headers: {
                Authorization:'Bearer '+ token
            }
        }
    }
}
export function TOKEN_VALIDATE_POST(token:string) {
    return {
        url:API_URL + 'jwt-auth/v1/token/validate',
        options: {
            method:'POST',
            headers: {
                Authorization:'Bearer '+token
            },
        }
    }
}

type CreateUser = {
    username:string;
    password:string;
    email:string;
}

export function USER_POST(body:CreateUser) {
    return {
        url:API_URL + 'api/user/',
        options: {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function PHOTO_POST(token:string,formData:FormData) {
    return {
        url:API_URL + 'api/photo/',
        options: {
            method:'POST',
            headers: {
                Authorization:"Bearer "+ token
            },
            body:formData
        }
    }
}
type GetPhotos = {page:number, total:any, user:any}
export function PHOTOS_GET({page, total, user}:GetPhotos) {
    return {
        url:API_URL + `api/photo/?_page=${page}&_total=${total}&_user=${user}`,
        options: {
            method:'GET',
            caches:'no-store'
        }
    }
}

export function PHOTO_GET(id:string) {
    return {
        url:API_URL + `api/photo/${id}`,
        options: {
            method:'GET',
            caches:'no-store'
        }
    }
}

type CommentPost = {
    comment:string
}
export function COMMENT_POST(token:string, id:string, body:CommentPost) {
    return {
        url:API_URL + `api/comment/${id}`,
        options: {
            method:'POST',
            headers: {
                Authorization:"Bearer "+ token,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        },
        
        
    }
}

export function PHOTO_DELETE(token:string, id:string) {
    return {
        url:API_URL + `api/photo/${id}`,
        options: {
            method:'DELETE',
            headers: {
                Authorization:"Bearer "+ token,
            },
        },
        
        
    }
}

interface IPasswordLost {
    login:string;
    url:string;
}

export function PASSWORD_LOST(body:IPasswordLost) {
    return {
        url:API_URL + 'api/password/lost',
        options: {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        } 
    }
}

interface IPasswordReset {
    login:string;
    key:string
    password:string
}
export function PASSWORD_RESET(body:IPasswordReset) {
    return {
        url:API_URL + 'api/password/reset',
        options: {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        } 
    }
}


export function GET_STATS() {
    return {
        url:API_URL + 'api/stats',
        options: {
            method: 'GET',
            headers: {
                Authorization:"Bearer" + localStorage.getItem('token')
            },
        } 
    }
}

/*
    O intuito desse arquivo é deixar todos os endpoints concentrados em um unico lugar
    , de bonus ele deixa o arquivo que fizer uso mais limpo.

*/ 