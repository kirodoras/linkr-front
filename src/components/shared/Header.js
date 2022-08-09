import { useState } from "react";
import Styled from "styled-components";
import { IoChevronDown } from "react-icons/io5";
import logo from '../../assets/linkr-logo.svg';
import defaultAvatar from '../../assets/default-avatar.png';

export function Header() {
    const userPicture = '';

    return (
        <HeaderStyled>
            <img src={logo} alt="Logo Linkr" />
            <div>
                <IoChevronDown />
                <img src={userPicture ? userPicture : defaultAvatar} alt="Avatar" />
            </div>
        </HeaderStyled>
    );
}

const HeaderStyled = Styled.header`
    width: 100%;
    height: 4.5rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: #151515;

    padding: 0 1.75rem 0 1.75rem;

    img:nth-child(1) {
        width: 6.75rem;
    }

    div {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        svg {
            font-size: 2.25rem; 
            color: #FFF;
        }
        img {
            width: 3.3125rem;
            border-radius: 50%;
        }
    }
`;