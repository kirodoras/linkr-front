import styled from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useState, useContext } from 'react';
import UserContext from "../../contexts/UserContext";
import axios from 'axios';

export function Heart({ id }) {
    const [clicked, setClicked] = useState(false);
    const { user } = useContext(UserContext);

    function click() {
        const token = user?.token;
        const userId = user?.userData.id;
        const postId = id;
        const URL = `http://localhost:4000/like`;
        const AUT = { headers: { Authorization: `Bearer ${token}` } };
        const BODY = { userId, postId };

        if (!clicked) {
            axios.post(URL, BODY, AUT)
                .then((res) =>
                    setClicked(true)
                ).catch(err => {
                    console.log(err)
                })
        } else {
            console.log(BODY)
            axios.delete(URL, BODY)
                .then((res) =>
                    setClicked(false)
                )
        }
    }
    return (
        <Container onClick={() => click()} heartColor={clicked}>
            {clicked ? <FaHeart /> : <FaRegHeart />}
        </Container>
    )
}

const Container = styled.div`
    color: ${props => props.heartColor ? "red" : "white"};
    position: absolute;
    
    top: 120px;
    left 50px;
`