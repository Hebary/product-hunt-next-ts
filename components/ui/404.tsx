import Link from 'next/link'
import styled from '@emotion/styled'

const Title = styled.h1`
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    margin:3rem;
    `
const A = styled.a`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    background-color: var(--orange2);
    color:#fff;
    text-transform: uppercase;
    padding: 8px 30px;
    display:block;
    width: 150px;
    margin: 3rem auto;
    cursor: pointer;
    &:hover{
        background-color: var(--orange);
        color:#fff;
        transition:all .3s;
    }
    `
export const Error404 : React.FC = (): JSX.Element => {
    return (
        <Title>
            Something went wrong, please try again.
            <Link href="/">
                <A>Return</A>
            </Link>
    </Title>
  )
}
