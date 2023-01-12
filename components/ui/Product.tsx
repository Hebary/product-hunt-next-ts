import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import styled from '@emotion/styled'
import { ProductProps } from '../../interfaces'


const Li = styled.div`
    padding: 2rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d3d3d3;
    align-items: center;
    font-family: 'Nunito', sans-serif;
    background-color: #fff;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: linear-gradient(44deg, #FFF 50%, #fd2f2f46); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        curosor: pointer;
        transition: all 0.3s ease-in-out;
    }
    
    @media (max-width: 768px) {
        flex-wrap: wrap;    
        justify-content: end;
        padding: 0;
    }
    `
const Description = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    column-gap: 2rem;
    @media (max-width: 578px) {
        grid-template-columns: 1fr;
        justify-content: center;
        padding: .5rem;
        margin-top: 1rem;
    }
    `
const Title = styled.button`
    font-weight: bold;
    display: inline-block;
    margin: 3rem 0 1rem 0;
    background-color: transparent;
    border: none;
    font-size:2.5rem;
    text-decoration: none;
    color: var(--orange);
    &:hover{
        transition: all .4s ease-in-out;
        transform: scale(1.0150);
        cursor: pointer;
    }
    @media (max-width: 468px) {
        text-align: center;
        margin: 0;
    }

    `
const Coments = styled.div`
   margin-top: 2rem;
   display: flex;
   algin-items: center;
   font-weight: bold;
   font-family: 'Roboto Slab', sans-serif;
    div{
        display: flex;
        align-items: center;
        padding: 0.3rem .6rem;
        margin-right: 1.5rem;
    }
    svg{
        width: 30px;
        height: 30px;
        margin-right: .5rem;

    }
    p{
        font-size: 1.6rem;
        font-weight: 700;
        margin-right: 2rem;
        &:last-of-type{
            margin-right: 0;
        }
    }
`

const Votes = styled.div`
    display: flex;
    padding: 2rem;
    gap: .5rem;
    align-items: center;
    border: 1px solid #e1e4e8;
    div{
        display:flex;
        font-size: 2rem;
    }
    p{
        font-size: 1.3rem;
        font-weight: 700;
        padding-bottom: .5rem;
    }
    `
const Pdescription = styled.p`
    font-size:1.7rem,
    font-weight: semi-bold;
    margin: 3rem 1rem 0;
`


export const Product: React.FC<ProductProps> = ({ product }: ProductProps) => {
    const {
        name,
        id,
        comments,
        createdAt, 
        urlImg, 
        votes, 
        description 
    } = product;
    
    return (
        <Li className='animate'>
            <Description>
                <div>
                    <Image
                        width={350}
                        style={{ objectFit: 'contain' }}
                        height={200}
                        src={urlImg}
                        alt='product'
                    />
                </div>
                <div>
                    <Link href='/products/[id]' as={`/products/${id}`}>
                        <Title>{name}</Title>
                    </Link>
                    <Pdescription>{description}</Pdescription>
                    <Coments>
                        <div>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                            </svg>
                            <p>{(comments?.length)} comments</p>
                        </div>
                    </Coments>

                    {createdAt && <p>Published at {formatDistanceToNow(new Date(createdAt))}</p>}

                </div>
            </Description>
            <Votes>
                <Image alt='arrow-votes' width={14} height={14} style={{ marginBottom: '7px' }} src='/arrow.svg'></Image>
                <p>{votes} <span>Votes</span></p>
            </Votes>
        </Li>
    )
}

