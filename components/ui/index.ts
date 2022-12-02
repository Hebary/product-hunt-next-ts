import styled from "@emotion/styled"

export const ButtonNav = styled.button`
    display: inline-block;
    font-weight: 700;
    border: none;
    outline: none;
    padding : .5rem 1rem;
    border-radius: .7rem;
    color:#000;
    background-color: #fff;
    font-family: 'Nunito', sans-serif;
        
        &:last-of-type {
            margin-right: none;
        }
        &:hover {
            color: var(--orange);
            cursor:pointer;
            transition: all 0.3s ease-in;
        }
    `;

export const Button = styled.button`
    display: inline-block;
    font-weight: 700;
    border: none;
    margin-bottom: 1rem;
    padding : .5rem 1rem;
    border-radius: .7rem;
    color:#fff;
    background-color: var(--orange);
    color:black;
    outline: none;
    font-family: 'Nunito', sans-serif;
        &:last-of-type {
            margin-right: none;
        }
        &:hover {
            color: white;
            cursor:pointer;
            transition: all 0.3s ease-in;
        }
    `;

export const ButtonNav2 = styled.button`
    display: inline-block;
    font-weight: 600;
    border: none;
    outline: none;
    padding : .5rem 2rem;
    margin: 2rem auto;
    border-radius: .7rem;
    color: #fff;
    text-align: center;
    font-family: 'Nunito', sans-serif;
    background-color: var(--orange);
        &:hover {
            background-color: var(--orange2);
            cursor:pointer;
            transition: all 0.3s ease-in;
        }

        @media (max-width: 768px) {
            margin: 0 auto;
        }
    `;

export const Form = styled.form`
        max-width: 600px;
        width: 95%;
        margin: 1rem auto 5rem auto;
        font-family: 'Work Sans', sans-serif;
        padding: .2rem 1.5rem .4rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.2);
        `;

export const Field = styled.div`
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        padding: 0.5rem;
        width: 100%;
        border-radius: 10px;
    
        label {
            flex: 0 0 100px;
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
            padding:0 0 0 2rem;
        }
        
        input, textarea {
            flex: 1;
            border: none;
            outline: none;
            padding: 0.8rem;
            font-size: 1.5rem;
            border: 1px solid #aaa;
            &:placeholder{
                color: #333;
            }
        }

        textarea {
            height: 100px;
            margin-left: 1rem;
            resize: none;
        }
    `;

export const Submit = styled.input`
    background-color: var(--orange);
    font-weight: bold;
    font-family: 'Nunito', sans-serif;
    color:#fff;
    width: 100%;
    border-radius:.7rem;
    padding: 1rem;
    margin-bottom: 2rem;
    letter-spacing: .15rem;
    border: none;
    &:hover{
            background-color: var(--orange2);
            cursor: pointer;
            transition:all .3s;
        }
    `;


export const Errors = styled.span`
        background-color :rgb(200,200,200);
        color: #000;
        font-family : "Nunito", sans-serif;
        font-weight: bold; 
        width: 80.8%;
        float: right;
        padding: 1;
        border-left: 4px solid #d8000c;
        margin: 0 0 2rem;
        margin-right: .5rem;
        text-align: center;
        line-height: 35px ;
        animation: op 0.3s ease-in-out;
        @keyframes op{
            from{
                transform:translateY(-100%);
                opacity: 0;
            }
            to{
                transform:translateY(0);
                opacity: 1;
            }

        }
        `
export const HeaderContainer = styled.div`
        max-width: 100%;
        margin: 0 1.3rem;
        font-family: 'Work Sans', sans-serif;
        @media (min-width: 768px) {
          display: flex;
          justify-content: space-between;
      }
        
    `;
export const LinkWrapper = styled.div`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        @media (max-width: 768px) {
            a, div { margin: 0 auto;}
        }
    `;
export const Logo = styled.span`
        background: var(--orange);
        font-size: 2.5rem;
        line-height: 1.5;
        font-weight: 700;
        margin: 1.5rem auto;
        font-family: 'Nunito', sans-serif;
        color: #fff;
        padding: 0.4rem 1.5rem;
        border-radius: 99%;
        &:hover {
          cursor:pointer;
        }
        @media (max-width: 768px) {
            display:inline-block;
            margin-top: 1rem;
        }
    `;

    export * from './404'
    export * from './Header'
    export * from './Nav'
    export * from './Product'
    export * from './Search'
    export * from './Spinner'