import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import fireBaseConfig from "./config"
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

class Firebase {
  auth: any;
  db: any
  storage:any

  constructor() {
    const app = initializeApp(fireBaseConfig);
    this.auth = getAuth();
    this.db = getFirestore(app);
    this.storage = getStorage()
    
  }
  //Registry a new user
  
  async signUp(name: string, email: string, password: string){
    
    const newUser = await createUserWithEmailAndPassword(this.auth, email, password);
      //updated and add name to created user
      return await updateProfile(newUser.user,{
          displayName: name
      });
  }
 
  //Login a user
  async signIn(email: string, password: string) {
    const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    }

  //Log Out
  async logOut(){
    await this.auth.signOut();
  }

}

export const firebase = new Firebase();
