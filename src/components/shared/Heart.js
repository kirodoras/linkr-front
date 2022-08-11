import styled from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useState, useContext } from 'react';
import UserContext from "../../contexts/UserContext";
import axios from 'axios';

export function Heart({ id }) {
    const [clicked, setClicked] = useState(false);
    const { user, apiUrl, authorization } = useContext(UserContext);

    function click() {
        const userId = user?.userData.id;
        const postId = id;
        const AUT = authorization;
        const BODY = { userId, postId };

        if (!clicked) {
            axios.post(`${apiUrl}/like`, BODY, AUT)
                .then((res) =>
                    setClicked(true)
                ).catch(err => {
                    console.log(err)
                })
        } else {
            axios.post(`${apiUrl}/deletelike`, BODY, AUT)
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
    
    top: 30%;
    left: calc((0.00415 * 100%) + 1.9412rem);
`