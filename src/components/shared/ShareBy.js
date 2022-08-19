import styled from 'styled-components';
import { IoRepeatOutline } from "react-icons/io5";

export function ShareBy({username, sharedBy}) {
    const name = username === sharedBy ? "you" : sharedBy;
    return (
        <ShareByStyled>
            <IoRepeatOutline />
            <p>Re-posted by <strong>{name}</strong></p>
        </ShareByStyled>
    );
}

const ShareByStyled = styled.div`
    display: flex;
    position: absolute;
    top: -53px;
    left: 0;

    display: flex;
    align-items: center;
    gap: 6px;

    margin-top: 20px;
    color: white;

    width: 100%;
    height: 33px;

    svg {
        margin-top: 0 !important;
        margin-left: 13px;
        font-size: 1.8rem;
    }

    p {
        font-weight: 400;
        font-size: 12px;
        line-height: 13px;
    }

    strong {
        font-size: 13px;
        font-weight: 700;
    }
`; 