import { useState, useContext } from "react";
import styled from "styled-components";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import logo from '../../assets/linkr-logo.svg';
import defaultAvatar from '../../assets/default-avatar.png';
import { useNavigate } from 'react-router-dom';
import UserContext from "../../contexts/UserContext";
import SearchBar from './SearchBar';

export function Header() {
    const { user, showLogout, setShowLogout } = useContext(UserContext);

    const userPicture = user.userData.pictureUrl;

    const navigate = useNavigate();

    function logout() {
        if(window.confirm("Você realmente deseja sair?")) {
            localStorage.removeItem("userData");
            navigate("/");
        }
    }

    function createDropdown() {
        if(!showLogout) {
            return (
                <>
                    <IoChevronDown onClick={() => setShowLogout(!showLogout)} />
                    <img src={userPicture ? userPicture : defaultAvatar} alt="Avatar" onClick={() => setShowLogout(!showLogout)} />
                </>
            );
        } else {
            return (
                <>
                    <IoChevronUp onClick={() => setShowLogout(!showLogout)} />
                    <img src={userPicture ? userPicture : defaultAvatar} alt="Avatar" onClick={() => setShowLogout(!showLogout)} />
                    <ul className='dropdown-content' onClick={logout}>
                        <li>
                            Logout
                        </li>
                    </ul>
                </>
            );
        }
    }

    function createSearchBarDesktop() {
        return (
            <ContainerSearchBarDesktop>
                <SearchBar />
            </ContainerSearchBarDesktop>
        );
    }

    function createSearchBarMobile() {
        return (
            <ContainerSearchBarMobile>
                <SearchBar />
            </ContainerSearchBarMobile>
        );
    }

    const dropdown = createDropdown();
    const searchBarDesktop = createSearchBarDesktop();
    const searchBarMobile = createSearchBarMobile();

    return (
        <Container>
            <HeaderStyled>
                <img src={logo} alt="Logo Linkr" onClick={() => navigate("/timeline")} />
                {searchBarDesktop}
                <Dropdown>
                    {dropdown}
                </Dropdown>
            </HeaderStyled>
            {searchBarMobile}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`

const ContainerSearchBarDesktop = styled.div`
    width: 500px;

    @media(max-width: 800px) {
        display: none;
    }
`

const ContainerSearchBarMobile = styled.div`
    position: absolute;
    top: 72px;
    display: none;
    z-index: 1;

    @media(max-width: 800px) {
        width: 100%;
        display: block;
        padding: 0 10px;
        height: 80px;
        background-color: #333333;
    }

`

const HeaderStyled = styled.header`
    width: 100%;
    height: 72px;

    display: flex;
    justify-content: space-between;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: #151515;

    &>img {
        margin-left: 28px;
        align-self: center;
    }

`

const Dropdown = styled.div`
    display: flex;
    align-items: center;
    gap: 0.625rem;
    position: relative;
    align-self: center;

    svg {
        font-size: 2.25rem; 
        color: #FFF;
    }
    
    img {
        width: 52px;
        height: 52px;
        margin-right: 17px;
        border-radius: 50%;
    }
    
    .dropdown-content {
        width: 150px;
        height: 47px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
        bottom: -57px;  

        background-color: #171717;
        border-radius: 0px 0px 0px 20px;
        z-index: 1;
    }

    li {
        margin-bottom: 8px;
        white-space: nowrap;
        display: flex;

        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #ffffff; 

        cursor: pointer;

        &:last-child{
            margin-bottom: 0;
        }
    }
`