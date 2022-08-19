import styled from 'styled-components';
import { IoRepeatOutline } from "react-icons/io5";

export function ShareBy() {
    const username = '@username';
    const sharedBy = "@outrapessoa";
    const name = username === sharedBy ? "you" : sharedBy;
    return (
        <ShareByStyled>
            <IoRepeatOutline />
            <p>{`Re-posted by ${name}`}</p>
        </ShareByStyled>
    );
}

const ShareByStyled = styled.div`
    display: flex;
    position: absolute;
    top: -47px;
    left: 0;

    display: flex;
    align-items: center;
    gap: 6px;

    margin-top: 20px;
    color: white;

    width: 100%;
    height: 39px;

    background: #1E1E1E;
    border-radius: 16px 16px 0 0;

    svg {
        margin-top: 0 !important;
        margin-left: 13px;
        font-size: 1.8rem;
    }

    p {
        font-weight: 400;
        font-size: 11px;
        line-height: 13px
    }
`; 