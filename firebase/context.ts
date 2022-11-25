import { createContext } from 'react';

interface ContextProps {
    firebase: any;
    user: any;
}

const FirebaseContext = createContext({} as ContextProps);

export { FirebaseContext };


