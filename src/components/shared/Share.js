import styled from 'styled-components';
import UserContext from "../../contexts/UserContext";
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { IoRepeatOutline } from "react-icons/io5";
import shareModalContext from '../../contexts/shareModalContext';

export function Share({ id }) {
    const { apiUrl, authorization } = useContext(UserContext);
    const [amount, setAmount] = useState(0);
    const { setShareModal } = useContext(shareModalContext);

    useEffect(() => {
        const URL = `${apiUrl}/share/${id}`;
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
        <ShareStyled  onClick={() => setShareModal({ status: true, postId: id })}>
            <IoRepeatOutline />
            <p>{`${amount} re-posts`}</p>
        </ShareStyled>
    );
}

const ShareStyled = styled.div`
    position: absolute;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    top: 63%;
    left: calc((0.00415 * 100%) + 0.74rem);

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