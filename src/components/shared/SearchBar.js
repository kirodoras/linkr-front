import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { DebounceInput } from 'react-debounce-input';
import UserFound from "./UserFound";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
    const { user, apiUrl, authorization } = useContext(UserContext);

    const [search, setSearch] = useState('');
    const [usersfoundlist, setUsersFoundList] = useState([]);

    useEffect(() => {
        if(search.length >= 3) {
            const URL = `${apiUrl}/users/${user.userData.id}?username=${search}`;
            const promise = axios.get(URL, authorization);
            promise.then((response) => {
                setUsersFoundList(response.data);
            }).catch((err) => {
                console.log(err);
            });
        } else {
            setUsersFoundList([]);
        }
    }, [search, apiUrl, authorization, user]);

    function loadUsers() {
        if(usersfoundlist.length > 0) {
            return (
                usersfoundlist.map((user, index) => <UserFound key={index} id={user.id} userPicture={user.pictureUrl} username={user.username} setSearch={setSearch} />)
            );
        }
        return (<></>); 
    }

    const showUsers = loadUsers();

    return (
        <Container usersfoundlist={usersfoundlist}>
            <IoSearch />
            <DebounceInput type="text" placeholder="Search for people" minLength={0} debounceTimeout={300} onChange={(e) => setSearch(e.target.value)} value={search} usersfoundlist={usersfoundlist} />
            {showUsers}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    margin-top: 12px;
    background: #E7E7E7;
    border-radius: 8px;
    padding-bottom: ${props => props.usersfoundlist.length > 0 ? "5px" : "0" };
    position: relative;
    
    input {
        width: 100%;
        height: 45px;
        border-radius: 8px;
        padding: 12px 18px;
        margin-bottom: ${props => props.usersfoundlist.length > 0 ? "5px" : "0" };

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

    svg {
        font-size: 1.5rem;
        color: #C6C6C6;
        position: absolute;
        right: 13px;
        top: 10px;
    }
`