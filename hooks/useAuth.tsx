import { useState, useEffect } from 'react'
import { firebase } from '../firebase';

type user = {
    uid: string,
    displayName: string,
    email: string,
    photoURL: string
} | null

const useAuthentication = () => {
    
    const [ userAuth, setUserAuth ] = useState<user>();

    useEffect (() => {
        const unsuscribe = firebase.auth.onAuthStateChanged((user :any) => {
            if(user){
                setUserAuth(user)
            }else {
                setUserAuth(null)
            }
        });
        return ( ) => unsuscribe();
    },[])


  return userAuth;
   
}

export default useAuthentication