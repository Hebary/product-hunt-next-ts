import styled from '@emotion/styled'

import { FC, FormEvent, useState } from 'react';
// import Router from 'next/router';
import Image from 'next/image';
import Router from 'next/router';



export const InputText = styled.input`
    padding: 1.3rem;
    border: 1px solid var(--gray3);
    &:focus{
        outline: none;
    }
    @media (max-width: 480px) {
        max-width: 90%;
    }
    margin: 0 10px;
    `;

const InputBtn = styled.button`
    display: flex;
    align-items: center;
    height: 3rem;
    position: absolute;
    right: .5rem;
    top: 11px;
    border: none;
    background: transparent;
    &:hover{
        cursor: pointer;
    }
    @media (max-width: 480px) {
        left: 160px;
    }
`;
const Form = styled.form`
    position: relative;
    left: 10px;

`;

export const Search : FC = () => { 

    const [search, setSearch] = useState('');
    
    const searchProduct = (e : FormEvent) => {
        e.preventDefault();
        if(search.trim() === '') return;
        Router.push({
            pathname: '/search',
            query: { q: search }
        })
    }

    return (
        <Form
            onSubmit={searchProduct}
        >
            <InputText type="text" placeholder="Search" onChange={e => setSearch(e.target.value)}/>
            <InputBtn>
                <Image src='/search.svg' width={55} height={55} alt='search-button' />
            </InputBtn>
        </Form>
    )
}

