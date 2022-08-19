import styled from 'styled-components';
import UserContext from "../../contexts/UserContext";
import axios from 'axios';
import { IoRepeatOutline } from "react-icons/io5";
//IoRepeatOutline
export function Share({ id }) {
    return (
        <ShareStyled>
            <IoRepeatOutline />
            <p>0 re-posts</p>
        </ShareStyled>
    );
}

const ShareStyled = styled.div`
    position: absolute;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    top: 70%;
    left: calc((0.00415 * 100%) + 0.85rem);

    svg {
        font-size: 1.5rem;
    }

    p {
        color: white;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
    }
`; 