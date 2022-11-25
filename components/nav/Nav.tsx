import styled from "@emotion/styled"
import Link from "next/link"
import React from "react"
import { FirebaseContext } from '../../firebase'
import { useContext } from "react"




export const Nav: React.FC = () => {
    const { user } = useContext(FirebaseContext);

  const Nav = styled.div`
    a {
      padding: 0 1rem;
      color:var(--gray2);
      font-size: 1.8rem;
      &:hover {
        color: var(--orange);
      }
    }
   
    @media (max-width: 480px) {
      flex-direction: row;
      justify-content: center;
      a{
        padding: 1rem;
      }
    }
  `

  return (
    <Nav>
      <Link href={'/'}>Home</Link>
      <Link href={'/about'}>About</Link>
      {user &&
            <Link href="/create-product">Post</Link>
            }
    </Nav>
  )
}

