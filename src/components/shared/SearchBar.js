import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DebounceInput } from 'react-debounce-input';
import UserFound from "./UserFound";
import UserContext from "../../contexts/UserContext";
import axios from "axios";

export default function SearchBar() {
    const { apiUrl, authorization } = useContext(UserContext);
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [usersFoundList, setUsersFoundList] = useState([]);

    useEffect(() => {
        if(search.length >= 3) {
            const URL = `${apiUrl}/users?username=${search}`;
            const promise = axios.get(URL, authorization);
            promise.then((response) => {
                setUsersFoundList(response.data);
            }).catch((err) => {
                console.log(err);
            });
        } else {
            setUsersFoundList([]);
        }
    }, [search, apiUrl, authorization]);

    function loadUsers() {
        return (
            usersFoundList.map((user, index) => <UserFound key={index} id={user.id} userPicture={user.pictureUrl} username={user.username} setSearch={setSearch} />)
        );
    }

    const showUsers = loadUsers();

    return (
        <Container usersFoundList={usersFoundList}>
            <DebounceInput type="text" placeholder="Search for people" minLength={0} debounceTimeout={300} onChange={(e) => setSearch(e.target.value)} value={search} usersFoundList={usersFoundList} />
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