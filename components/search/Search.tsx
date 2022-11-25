import styled from '@emotion/styled'

import { FC, FormEvent, useState } from 'react';
// import Router from 'next/router';
import Image from 'next/image';
import Router from 'next/router';



export const InputText = styled.input`
    max-width: 300px;
    padding: 1.3rem;
    border: 1px solid var(--gray3);
    @media (min-width: 768px) {
        margin: 0 0 0 4em;
    }
    &:focus{
        outline: none;
    }
`;

const InputBtn = styled.button`
    display: flex;
    align-items: center;
    width: 3rem;
    height: 3rem;
    position: absolute;
    right: .5rem;
    top: 11px;
    border: none;
    background: transparent;
    &:hover{
        cursor: pointer;
    }
`;
const Form = styled.form`
    position: relative;
    @media (max-width: 768px) {
        margin: 0 auto;
    }
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

