import styled from 'styled-components';
import shareModalContext from '../../contexts/shareModalContext';
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';

export default function ShareModal() {
    const { shareModal, setShareModal } = useContext(shareModalContext);
    const postId = shareModal.postId;

    const { apiUrl, authorization, update, setUpdate } = useContext(UserContext);
  
    const [disabled, setDisabled] = useState(false);
    const [buttonContent, setButtonContent] = useState("Yes, share!");

    function sharePost(id) {
        setDisabled(true);
        setButtonContent(<ThreeDots height={70} width={70} color="#FFFFFF" />);
        const URL = `${apiUrl}/share/${postId}`;
        const AUT = authorization;
        console.log(AUT)
        const promise = axios.post(URL, {}, AUT);
        promise.then((response) => {
            setShareModal({ status: false, postId: false });
            setUpdate(!update);
        }).catch((err) => {
            console.log(err);
            setShareModal({ status: false, postId: false });
            alert("Erro ao dar share");
        });
    }

    return (
        <ShareModalStyled>
            <ModalContentStyled>
                <h1>Do you want to re-post this link?</h1>
                <div>
                    <button
                        disabled={disabled}
                        className='no'
                        onClick={() => setShareModal({ status: false, postId: false })}>
                        No, cancel
                    </button>
                    <button
                        disabled={disabled}
                        className='yes'
                        onClick={() => sharePost(postId)}>
                        {buttonContent}
                    </button>
                </div>
            </ModalContentStyled>
        </ShareModalStyled>
    );
}

const ShareModalStyled = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 15;

    background: rgba(255, 255, 255, 0.8);
`;

const ModalContentStyled = styled.div`
    width: 37.3125rem;
    height: 16.375rem;
 
    background: #333333;
    border-radius: 3.125rem;

    margin: 0 1rem 0 1rem; 

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0.5rem;

    h1 {
        margin-top: 2.375rem;
        font-style: normal;
        font-weight: 700;
        font-size: 34px;
        line-height: 41px;
        text-align: center;

        color: #FFFFFF;
    }

    div {
        margin-top: 2.375rem;
        display: flex;
        gap: 27px; 
    }

    button {
        border: none;
        width: 8.375rem;
        height: 2.3125rem;
        border-radius: 0.3125rem;
        font-style: normal;
        font-weight: 700;
        font-size: 1.125rem;
        line-height: 1rem;
    }

    .no {
        background: #FFFFFF;
        color: #1877F2;
    }

    .yes {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #1877F2;
        color: #FFFFFF;
    }

    svg {
        margin-top: -2rem;
    }

    @media(max-width: 68.75rem) {
        div {
            gap: 1rem; 
        }
        
        button {
            width: 6.25rem;
        }
    }
`;