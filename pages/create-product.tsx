import { Layout } from "../components/layout"
import { Form, Field, Submit, Errors } from "../components/ui/"
import useValidator from "../hooks/useValidator"
import { validateCreateProduct } from '../validations'


//Firebase
import { FormEvent, useContext, useState } from "react"
import { FirebaseContext } from "../firebase"
//Router
import { useRouter } from "next/router"
import { Error404 } from "../components/404"
import { addDoc, collection } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// 


type Img = { name: string | null, url: string | null | undefined | Blob }

export default function NewProduct(): JSX.Element {


  const router = useRouter()
  const [error, setError] = useState(false)
  const [img, setImg] = useState<Img>({ name: null, url: null })
  const [urlImg, setUrlImg] = useState('')

  const { user, firebase } = useContext(FirebaseContext)

  const initialState = {
    name: "",
    company: "",
    image: "",
    url: "",
    description: ""
  }

  const {
    handleSubmit,
    errors,
    values,
    handleChange,
    handleOnBlur,

  } = useValidator(initialState, validateCreateProduct, newProduct)

  const { name, company, description, url } = values;

  const handleFile = (e: any) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0])
    }
  }




  async function newProduct() {
    if (!user) {
      return router.push('/login')
    }
    setUrlImg(await handleUrl())
    if (urlImg !== '') {

      const product = {
        name,
        company,
        url,
        urlImg,
        description,
        votes: 0,
        comments: [],
        createdAt: Date.now(),
        creator: {
          name: user.displayName,
          id: user.uid
        },
        hasVoted: []
      }
      try {
        //create collection with new product
        console.log(product)
        await addDoc(collection(firebase.db, "products"), product);
        router.push('/')
      } catch (error) {
        console.error(error)
      } finally {
        setImg({ name: null, url: null })
      }
    }
  }

  const handleUrl = async () => {
    // upload img and get URL
    const storageRef = ref(firebase.storage, 'products/' + img?.name)
    await uploadBytes(storageRef, (img as any))
    getDownloadURL(storageRef)
      .then(url => {
        setUrlImg(url)
      })
    return urlImg
  }


  return (
    <Layout>
      {!user ? <Error404 /> :
        <div className='animate'>
          <h1
            style={{
              textAlign: 'center',
              fontSize: '50px',
              marginTop: '5rem',
            }}>New Post
          </h1>
          <Form
            onSubmit={handleSubmit}
            noValidate
          >
            <h4>We&apos;ll need some details, and you&apos;ll be able to post</h4>
            <Field>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Product name"
                value={name}
                onChange={handleChange}
                onBlur={handleOnBlur}
              />
            </Field>
            {errors.name && <Errors>{errors.name}</Errors>}
            <Field>
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="company"
                value={company}
                onChange={handleChange}
                onBlur={handleOnBlur}
              />
            </Field>
            {errors.company && <Errors>{errors.company}</Errors>}
            <Field>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onInput={(e) => handleFile(e)}
              />
            </Field>
            <Field>
              <label htmlFor="url">URL</label>
              <input
                type="url"
                id="url"
                name="url"
                placeholder="URL product"
                value={url}
                onChange={handleChange}
                onBlur={handleOnBlur}
              />
            </Field>
            {errors.url && <Errors>{errors.url}</Errors>}
            <h4>About the product</h4>
            <Field>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe the product..."
                value={description}
                onChange={handleChange}
                onBlur={handleOnBlur}
              />
            </Field>
            {errors.description && <Errors>{errors.description}</Errors>}
            {error && <Errors>{error}</Errors>}

            <Submit
              type="submit"
              value="Post"
            />
          </Form>
        </div>
      }
    </Layout>
  )
}