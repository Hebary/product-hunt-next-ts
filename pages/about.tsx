import styled from '@emotion/styled'
import Image from 'next/image'
import React from 'react'
import { Layout } from '../components/layout'

const Container = styled.div`
h1{ 
    text-align: center;
    font-size: 3.3rem;
    margin-top: 2rem;
}
img{
    display:block;
   margin: 5rem auto 0;
}
padding: 3% 5%;

p{
    margin-top:0;
    font-size: 2.9rem;
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
    text-align: left;
}
    @media (min-width: 768px) {
        img{ margin: 5rem auto 0;}
        display: grid;
        grid-template-columns: 1fr;
    }
    
`
export default function about() : JSX.Element{
    return (
        <Layout>
            <Container 
            className='animate'>

            <Image 
                src='https://ph-static.imgix.net/glasshole_kitty_logo.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=77&h=72&fit=max&dpr=1' 
                width={150} height={150} alt='about-logo'></Image>
            <h1>About Product Hunt</h1>
            <p>
                Product Hunt surfaces the best new products, every day.
                It&apos;s a place for product-loving enthusiasts to share and geek out about the latest mobile apps, websites, hardware projects, and tech creations.
            </p>
            </Container>
        </Layout>
    )
}