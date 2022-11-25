import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Error404 } from '../../components/404'
import { Layout } from '../../components/layout'
import styled from '@emotion/styled';
import { formatDistanceToNow } from 'date-fns'
import { ButtonNav2, Field, Submit } from '../../components/ui'
import { FirebaseContext } from '../../firebase/context';
import { useContext } from 'react'
import { Button } from '../../components/ui'
import Image from 'next/image';
import { Spinner } from '../../components/spinner';
import Link from 'next/link';
import Swal from 'sweetalert2'

const Title = styled.h1`
font-size: 2.9rem;
font-weight: bold;
text-align: left;
margin: 1em 0;
    @media (max-width: 768px) {
        font-size: 2.2rem;
        text-align: center;
        margin-bottom: 1em;
    }
`
const Container = styled.div`
    padding: 0% 15% 10%; 
    p{
        margin-top:0;
        font-size: 1.9rem;
        font-family:'Work Space', sans-serif;
        font-weight: 500;
    }
    @media (min-width: 768px) {
        padding: 10% 15%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(600px, auto));
        grid-auto-flow: row;
    }
`

const Flex = styled.div`
    display: flex;
    justify-content:space-evenly;
    align-items: center;
    // margin: 2rem auto 0;
    gap: 1rem;
    @media (max-width: 768px) {
        margin-top: 0;
    }
`

const Figure = styled.div`
@media (max-width: 768px) {
    max-width: 100%;
    margin: 0 auto;
    text-algin: center;

`

const Li = styled.li`
    list-style: none;
    font-family: 'PT Sans', sans-serif;
    padding: 1em 0 0 0;
    margin: 1em 1em 0;
    border-bottom: 1px solid #e1e1e1;
    span{
        font-weight: bold;
        border-bottom: 1px solid #ccc;
        padding-bottom: 2%;
    }
`
const Msg = styled.p`
    font-size: 1.5rem;
    margin-left: 1rem;
`
const Input = styled.input`
    width: 100%;
    border: none;
    outline: none;
    padding: 0.8rem;
    font-size: 1.5rem;
    border: 1px solid #aaa;
    font-family: 'PT Sans', sans-serif;

    `
const Wrapper = styled.div`
    max-width: 95%;
    background: #f5f5f5;
    margin: 3rem auto;
    padding-bottom:3rem;
    @media (min-width: 768px) {
    padding: 2rem 2rem 2rem 10rem;
    }
    border-radius: 15px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.3);
    margin-top: 3rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, auto));
`

const Creator = styled.p`
    padding: .5rem;
    background-color: #DA552F;
    border-radius:8px;
    font-size: 1rem;
    margin-right:2rem;
    color: #fff;
    font-weight: bold;
    display: inline-block;
    @media (max-width: 768px) {
        width: 100%;
        display: block;
        text-align:center;
        }
`
const Heading = styled.div`
    font-family: 'Nunito' , sans-serif;
    font-weight: 700;
    font-size:3.5rem;
    margin-top: 2.5rem;
    margin-bottom: 0;

`
const Votes = styled.div` 
    display: flex;
    align-items: start;    
    margin: 2rem 0;
    gap: 2rem;
    p{
        margin: 0;
    }

    button{
        font-size: 1.5rem;
        padding: .5rem 1rem;
        color: #fff;
        border-radius: .7rem;
        border : 1px solid black;
        &: hover {
            cursor: pointer;
            background : white;
            outline : 1px solid black;
            color: black;
            transition: all .3s ease-in-out;
    }
`

type Comment = {
    userid: string
    message: string
    userName: string
}
type Product = {
    id?: string
    name?: string
    description?: string
    comments?: Comment[]
    createdAt?: string
    company?: string
    url?: string
    creator?: {
        id: string
        name: string
    }
    urlImg?: string
    votes?: number
    hasVoted?: string[]
}



export default function Product(): JSX.Element {

    const [product, setProduct] = useState<Product>({} as Product)
    const [error, setError] = useState(false)
    const [comment, setComment] = useState<Comment>({} as Comment)
    const [queryDB, setQueryDB] = useState(true)
    const router = useRouter();

    const { query: { id } } = router;

    const { user, firebase } = useContext(FirebaseContext);


    useEffect(() => {
        if (id && queryDB) {
            const fireFetch = async () => {
                try {
                    const docRef = doc(firebase.db, "products", id as string);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const product = { ...docSnap.data(), id: docSnap.id }
                        setProduct(product);
                        setQueryDB(false)

                    } else {
                        setError(true);
                        setQueryDB(false)

                    }
                } catch (error) {
                    console.log("Error getting document:", error);
                }
            }
            fireFetch();
        }
    }, [id, firebase.db, queryDB])


    {
        const { name,
            creator,
            company,
            comments,
            url,
            createdAt,
            urlImg,
            votes,
            description,
            hasVoted } = product;


        const addVote = async () => {
            if (!user) {
                return router.push('/login')
            }
            if (hasVoted?.includes(user.uid as string)) {
                return
            }
            const docRef = doc(firebase.db, "products", (id as string));
            const docSnap = await getDoc(docRef);
            const newVotes = docSnap.data()?.votes + 1;
            await updateDoc(docRef, { votes: newVotes, hasVoted: [...hasVoted || [], user.uid] });


            setProduct({ ...product, votes: newVotes });
            setQueryDB(false)
        }

        //Comments
        const comentChange = (e: ChangeEvent<HTMLInputElement>) => {
            setComment({
                ...comment,
                [e.target.name]: e.target.value
            })
        }

        const addComent = async (e: any) => {
            e.preventDefault();
            if (!user) {
                return router.push('/login')
            }
            comment.userid = user.uid;
            comment.userName = user.displayName;
            const newComments = [...comments || [], comment];

            const docRef = doc(firebase.db, "products", id as string);
            await getDoc(docRef);
            await updateDoc(docRef, { comments: newComments });

            setProduct({ ...product, comments: newComments });
            setQueryDB(false)
            const form: any = document.querySelector('#form');
            form.reset();
        }
        //Creator
        const isCreator = (id: string) => {
            if (creator?.id === id) {
                return true;
            }
        }

        //is the creator the same who is authenticatd?

        const checkAuth = () => {
            if (!user) return false
            if (creator?.id === user.uid) {
                return true;
            }
        }
        const deleteProduct = async () => {

            try {
                if (!user || creator?.id !== user.uid) {
                    router.push('/login')
                    return;
                }
                const docRef = doc(firebase.db, "products", (id as string));
                await getDoc(docRef);
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await deleteDoc(docRef);
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        router.push('/')
                    }
                })

            } catch (error) {
                console.log(error)
            }
        }
        return (
            <Layout>
                {error ? <Error404 /> :
                    <Wrapper>
                        {!product?.name && <Spinner />}

                        <Figure>
                            <Title>{name}</Title>
                            {urlImg &&
                                <Image
                                    src={urlImg}
                                    width={250}
                                    style={{ objectFit: 'contain' }}
                                    height={250}
                                    alt={`Product ${product.name}`} />}
                        </Figure>
                        <Container>
                            <div>
                                {createdAt && <p>Published at {formatDistanceToNow(new Date(createdAt))}</p>}
                                {creator && <p>By {creator?.name} from {company} </p>}
                                <p>{description}</p>
                            </div>

                            {user &&
                                <>
                                    <h2>Leave your coments</h2>
                                    <form id='form' onSubmit={addComent}>
                                        <Field>
                                            <Input type="text" name="message" onChange={comentChange} />
                                        </Field>
                                        <Submit
                                            type="submit"
                                            value="Add Coments"
                                        />
                                    </form>
                                </>
                            }
                            <Flex>
                                <Votes>
                                    <p> {votes} Votes</p>
                                    {user &&
                                        <Button type="button"
                                            onClick={addVote}
                                        >
                                            Vote
                                        </Button>
                                    }
                                </Votes>
                                <Link href={url || ''}>
                                    <Button                                >
                                        Visit URL
                                    </Button>
                                </Link>
                            </Flex>
                            <Heading>All coments</Heading>
                            {
                                comments && comments?.length === 0 ? "There are no coments" : (

                                    <ul>
                                        {comment.userName && comments?.map((comment: Comment, i: number) => (
                                            <Li
                                                key={`${comment.userid}-${i}`}
                                            >
                                                <div>
                                                    {isCreator(comment.userid) && <Creator>Creator</Creator>}
                                                    <span>{comment.userName}</span>
                                                </div>
                                                <Msg>{comment.message}</Msg>
                                            </Li>
                                        ))
                                        }
                                    </ul>
                                )}

                        </Container>

                        <Figure>

                            {creator && checkAuth() && <ButtonNav2
                                onClick={deleteProduct}
                            >Delete Product</ButtonNav2>}
                        </Figure>
                    </Wrapper>
                }
            </Layout>
        )
    }
}
