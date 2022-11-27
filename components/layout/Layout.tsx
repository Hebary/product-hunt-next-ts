import Head from "next/head"
import { Global, css } from "@emotion/react"
import { Header } from "../ui"

interface LayoutProps {
    children: JSX.Element | JSX.Element[]
}


export function Layout( {children} : LayoutProps) : JSX.Element {

  return (
    <>  
        <Global
            styles = {css`
                :root{
                    --gray: #3d3d3d;
                    --gray2: #6f6f6f;
                    --gray3: #e1e1e1;
                    --orange: #FF6154;
                    --orange2: #FF4137;
                }

                html{
                    font-size: 62.5%;
                    box-sizing: border-box;
                }
                *,*:before,*:after{
                    box-sizing: inherit;
                }
                body{
                    font-size: 1.6rem;
                    line-height: 1.5;
                    font-family: 'Nunito', sans-serif;
                }
                h1,h2,h3{
                    margin: 0 0 2rem 0;
                    line-height: 1.5;
                }
                h1, h2 {
                    font-family:'Nunito',sans-serif;
                    font-weight: 700;
                }
                
                ul{
                    list-style: none;
                    margin:0;
                    padding:0;
                }
                a{
                    text-decoration:none;
                }
                header{
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                    padding: .5rem 0;
                }
                img{
                    max-width: 100%;
                    max-height: 65%;
                }

            `}
        />
        <Head>
            <title>Product Hunt Firebase & Next.js</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </Head>

        <Header/>
        <main>
            {children}
        </main>
    </>
  )
}
