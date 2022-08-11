import { useState } from "react";
import Styled from "styled-components";
import defaultAvatar from '../../assets/default-avatar.png';
import { ThreeDots } from 'react-loader-spinner';
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export function PublishPost() {
    const { user } = useContext(UserContext);
    const token = user?.token;
    const userData = user?.userData;

    const [url, setUrl] = useState('');
    const [article, setArticle] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [buttonContent, setButtonContent] = useState('Publish');

    function submitData(event) {
        event.preventDefault();
        if (token.length > 0) {
            setDisabled(true);
            setButtonContent('Publishing...');

            const URL = `http://localhost:4001/timeline`;
            const AUT = { headers: { Authorization: `Bearer ${token}` } };
            const BODY = { url, article };

            const promise = axios.post(URL, BODY, AUT);

            promise.then((response) => {
                console.log(response);
                setDisabled(false);
                setButtonContent('Publish');
                setUrl('');
                setArticle('');
            }).catch((err) => {
                alert("Houve um erro ao publicar seu link");
                setDisabled(false);
                setButtonContent('Publish');
            });
        }
    }

    return (
        <PublishPostStyled>
            <img src={userData ? userData.pictureUrl : defaultAvatar} alt="Avatar" />
            <FormStyled onSubmit={submitData}>
                <h2>What are you going to share today?</h2>
                <input
                    disabled={disabled}
                    type='url'
                    placeholder='http://...'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required />
                <textarea className='article'
                    disabled={disabled}
                    type='text'
                    placeholder='Awesome article about #javascript'
                    value={article}
                    onChange={(e) => setArticle(e.target.value)} />
                <button type='submit' disabled={disabled}>{buttonContent}</button>
            </FormStyled>
        </PublishPostStyled>
    );
}

const PublishPostStyled = Styled.div`
    width: 100%;
    height: 13.0625rem;

    background: #FFFFFF;
    box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
    border-radius: 1rem;

    margin-top: 2.6875rem;
    padding: 1rem 1.125rem;

    display: flex;
    gap: 1.125rem;

    &>img {
        width: 3.125rem;
        height: 3.125rem;
        border-radius: 50%;
    }

    @media(max-width: 1100px) {
        height: 10.25rem;
        border-radius: 0;
        padding: 0.625rem 0.9375rem;
        margin-top: 1.1875rem;
        &>img {
            display: none;
        }
    }
`;

const FormStyled = Styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
    width: 100%;

    &>h2 {
        font-weight: 300;
        font-size: 1.25rem;
        line-height: 1.5rem;
        color: #707070;
    }

    &>input {
        background: #EFEFEF;
        border-radius: 0.3125rem;
        height: 1.875rem;
        color: #949494;
        padding-left: 0.8125rem;
    }

    &>textarea:active, &>textarea:focus {
        box-shadow: inset 0 0 0 0.125rem #202020;
    }

    &>textarea {
        background: #EFEFEF;
        border-radius: 0.3125rem;
        height: 4.125rem;
        color: #949494;
        resize: none;
        outline: none;
        padding: 0.3125rem 0.8125rem 0 0.8125rem;
        word-wrap: break-word;
    }

    &>button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 7rem;
        height: 1.9375rem;
        background: #1877F2;
        border-radius: 0.3125rem;
        color: #FFFFFF;
        align-self: end;
    }

    @media(max-width: 68.75rem) {
        &>h2 {
            align-self: center;
            margin-bottom: ;
        }
    }
`;