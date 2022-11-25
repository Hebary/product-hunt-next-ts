import { useContext, useState } from "react"
import { useRouter } from "next/router"
import useValidator from "../hooks/useValidator"
import { FirebaseContext } from "../firebase"
import { validateCreateAccount } from '../validations'
import { Layout } from "../components/layout"
import { Form, Field, Submit, Errors } from "../components/ui/"



type message = string | null


export default function CreateAccount(): JSX.Element {

  const { firebase } = useContext(FirebaseContext)
  const router = useRouter()

  const [error, setError] = useState<message>(null)

  const initialState = {
    name: "",
    email: "",
    password: ""
  }

  //Custom Hook
  const { 
    errors,
    values,
    handleChange,
    handleOnBlur,
    handleSubmit
  
  } = useValidator(
  
      initialState, 
      validateCreateAccount, 
      createAccount

    );

  const { name, email, password } = values;

  async function createAccount() {
    try {
        await firebase.signUp(name, email, password)
        router.push('/') 
    } catch (error) {
      //To evoit the message of Firebase
      if (error) {
        const message = 'User already exists';
        setError(message)
        setTimeout(() => {
          setError(null)
        }, 3000)
      }
    }
  }

  return (
    <Layout>
      <div className='animate'>

        <h1
          style={{
            textAlign: 'center',
            marginTop: '5rem',
            fontSize: '50px',
          }}>Sign up
        </h1>
        <Form
          onSubmit={handleSubmit}
          noValidate
        >
          {error && <Errors>{error}</Errors>}
          {errors.name && <Errors>{errors.name}</Errors>}
          <Field>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="your name"
              value={name}
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
          </Field>
          {errors.email && <Errors>{errors.email}</Errors>}
          <Field>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your email"
              value={email}
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
          </Field>
          {errors.password && <Errors>{errors.password}</Errors>}
          <Field>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="your password"
              value={password}
              onChange={handleChange}
            />
          </Field>
          <Submit
            type="submit"
            value="Create Account"
          />
        </Form>
      </div>
    </Layout>
  )
}