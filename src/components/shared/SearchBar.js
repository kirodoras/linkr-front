import styled from "styled-components";
import { useState } from "react";
import { DebounceInput } from 'react-debounce-input';
import UserFound from "./UserFound";

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [usersFoundList, setUsersFoundList] = useState([]);

    function goUserPage() {
        alert("vai pra pagina do usuario");
    }

    function loadUsers() {
        return (
            usersFoundList.map((user, index) => <UserFound key={index} userPicture={user.pictureUrl} name={user.name} goUserPage={goUserPage} />)
        );
    }

    const showUsers = loadUsers()

    return (
        <Container usersFoundList={usersFoundList}>
            <DebounceInput type="text" placeholder="Search for people" minLength={3} debounceTimeout={300} onChange={(e) => setSearch(e.target.value)} value={search} usersFoundList={usersFoundList} />
            {showUsers}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    margin-top: 12px;
    background: #E7E7E7;
    border-radius: 8px;
    padding-bottom: ${props => props.usersFoundList.length > 0 ? "5px" : "0" };
    
    input {
        width: 100%;
        height: 45px;
        border-radius: 8px;
        padding: 12px 18px;
        margin-bottom: ${props => props.usersFoundList.length > 0 ? "5px" : "0" };

        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #515151;

        &::placeholder {
            font-weight: 400;
            font-size: 19px;
            line-height: 23px;
            color: #C6C6C6;
        }
    }
`