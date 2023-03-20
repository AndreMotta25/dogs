import React, { useState } from 'react'

const validations = {
    email: {
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: 'Preencha um email valido'
    }
}

const useForm = (type?: keyof typeof validations | false ) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    if(error) validate(target.value);
    setValue(target.value);
  }

  const validate = (value:string) => {
    if(type === false) return true;
    
    if(value.length === 0) {
       setError('Preencha um valor');
       return false;
    }
    else if(type && type in validations && !validations[type].regex.test(value)) {
        setError(validations[type].message);
        return false;
    }
    else {
        setError(null);
        return true;
    } 
  }

  return {
    value, 
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
    error
  }
}

export default useForm