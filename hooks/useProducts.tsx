import { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../firebase'
import { collection, getDocs, orderBy } from "firebase/firestore"


export const useProducts = () => {

interface dbProducts 
    { id: string; }[]

    const [products, setProducts ] = useState<dbProducts[]>([])
    
    const { firebase } = useContext(FirebaseContext)

    useEffect( () => {
    const fireFetch = async () => {
        try {
            const querySnapshot = await getDocs(collection(firebase.db, "products") );
            const dbProducts = querySnapshot.docs.map( doc => ({
                id: doc.id,
                ...doc.data()
            }));
               setProducts(dbProducts)
        }catch (err) {
            console.log(err);
        }
    }
        fireFetch()
},[])
    return {
        products
    }
}

