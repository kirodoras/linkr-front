import styled from 'styled-components';
import UserContext from "../../contexts/UserContext";
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { IoChatbubblesOutline } from "react-icons/io5";

export function CommentIcon({ id }) {
    const { apiUrl, authorization } = useContext(UserContext);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const URL = `${apiUrl}/comment/${id}`;
        const promise = axios.get(URL);
        promise.then((res) => {
            if (res.data.amount === null || res.data.amount === undefined) {
                setAmount(0);
            } else {
                setAmount(res.data.amount);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [apiUrl]);

    return (
        <ShareStyled>
            <IoChatbubblesOutline />
            <p>{`${amount} comments`}</p>
        </ShareStyled>
    );
}

const ShareStyled = styled.div`
    position: absolute;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    top: 42.5%;
    left: calc((0.00415 * 100%) + 0.4rem);

    svg {
        font-size: 1.8rem;
    }

    p {
        color: white;
        font-weight: 400;
        font-size: 12px;
        line-height: 13px;
    }
`; 