import Link from "next/link"
import { FirebaseContext } from '../../firebase'
import React, { useContext } from "react"
import { Nav } from "../ui";
import { ButtonNav, ButtonNav2, HeaderContainer, LinkWrapper, Logo } from "../ui";
import { Search } from "../ui";




export const Header: React.FC = () => {
    const { user, firebase } = useContext(FirebaseContext);
  return (
    <header>
      <HeaderContainer>
        <LinkWrapper>
          <Link href="/">
            <Logo>
              P</Logo>
          </Link>
            <Search />
            <Nav />
          </LinkWrapper>


        <LinkWrapper>
          {user ?
            <>
              <p style={{margin:'0 1.5rem'}}>Hi {user?.displayName}</p>
                <ButtonNav2
                  onClick={() => firebase.logOut()}
                >
                  Sign out
                </ButtonNav2>
            </> :
            <>
              <Link href="/login">
                <ButtonNav>Sign in</ButtonNav>
              </Link>
              <Link href="/create-account">
                <ButtonNav2>Sign up</ButtonNav2>
              </Link>
            </>
           }
        </LinkWrapper>

      </HeaderContainer>

    </header>
  )
}

export default Header
