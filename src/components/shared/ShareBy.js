import styled from 'styled-components';
import { IoRepeatOutline } from "react-icons/io5";

export function ShareBy() {
    const username = '@username';
    const sharedBy = "@outrapessoa";
    const name = username === sharedBy ? "you" : sharedBy;
    return (
        <ShareByStyled>
            <IoRepeatOutline />
            {`Re-posted by ${name}`}
        </ShareByStyled>
    );
}

const ShareByStyled = styled.div`
    display: flex;
    position: absolute;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    top: -40px;
    left: 0;
    margin-top: 20px;
    color: white;
`; 