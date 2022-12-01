import styled from "@emotion/styled"
import Link from "next/link"
import React from "react"
import { FirebaseContext } from '../../firebase'
import { useContext } from "react"


export const Nav: React.FC = () : JSX.Element => {
  
  const { user } = useContext(FirebaseContext);

  const Nav = styled.div`
  display: flex;
    a {
      padding: 0 1rem;
      color:var(--gray2);
      font-size: 1.8rem;
      &:hover {
        color: var(--orange);
      }
    }
   
    @media (max-width: 480px) {
      justify-content: center;
      a{
        padding: 1rem;
      }
    }
  `
  const Link_item = styled.div`
    display:inline-block;
    padding:.5rem;
  `

  return (
    <Nav>
      <Link href={'/'}>
        <Link_item>Home</Link_item>
      </Link>
      <Link href={'/about'}>
        <Link_item>About</Link_item>
      </Link>
      {user &&
        <Link href="/create-product">
          <Link_item>Post</Link_item>
        </Link>
      }
    </Nav>
  )
}

