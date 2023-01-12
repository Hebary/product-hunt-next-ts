import type { AppProps } from 'next/app'
import { FirebaseContext, firebase } from '../firebase'
import '../styles/globals.css'
import userAuth from '../hooks/useAuth'

const App = ({Component, pageProps} : AppProps) => {
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
export default App