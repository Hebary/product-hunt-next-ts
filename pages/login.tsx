import { Layout } from "../components/layout/"
import { Form, Field, Submit, Errors } from "../components/ui"
import useValidator from "../hooks/useValidator"
//Firebase
import { firebase } from "../firebase"
import { useState } from "react"

//Router
import { useRouter } from "next/router"
import { validateLogin } from "../validations"
import { NextPage } from "next"


type message = string | null

const Login: NextPage = () =>{
    const router = useRouter()
    const [error, setError] = useState<message>(null)

    const initialState = {
        email: "",
        password: ""
    }
      const { handleSubmit, errors, values, handleChange, handleOnBlur } = useValidator(initialState, validateLogin, login)

      const { email, password } = values;

    async function login() {
        try {
            await firebase.signIn( email, password)
            router.push('/')
        } catch (error) {
            //To evoit the message of Firebase
            const message = "Wrong Password or Email"
            setError(message)
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    }


    return (
        <Layout>
            <div className='animate'>
                <h1
                    style={{
                        textAlign: 'center',
                        fontSize:'50px',
                        marginTop: '5rem',
                    }}>Sign in
                </h1>
                <Form
                    noValidate
                    onSubmit={handleSubmit}
                >
                    {errors.email && <Errors>{errors.email}</Errors>}
                    {error && <Errors>{error}</Errors>}
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
                        value="Continue"
                    />
                </Form>
            </div>
        </Layout>
    )
}

export default Login