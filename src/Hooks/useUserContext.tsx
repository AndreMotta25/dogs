import React from 'react';
import {UserContext} from '../Context/UserContext';

export const useUserContext = () => React.useContext(UserContext);