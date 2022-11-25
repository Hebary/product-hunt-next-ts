import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { FirebaseContext, firebase } from '../firebase'
import userAuth from '../hooks/useAuth'
export default function App({ Component, pageProps }: AppProps) {
  const user = userAuth();
  return (
    <FirebaseContext.Provider
      value={{
        user, firebase
      }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}
