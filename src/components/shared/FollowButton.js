import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

export function FollowButton({ userId, alreadyFollow, setAlreadyFollow}) {
    const { user, apiUrl, authorization, update, setUpdate } = useContext(UserContext);

    const [disabled, setDisabled] = useState(false);

    console.log(alreadyFollow);

    function follow() {
        const BODY = { followerId: user.userData.id, followedId: userId }
        const URL = `${apiUrl}/follow`;
        const AUT = authorization;

        setDisabled(true);

        const promise = axios.post(URL, BODY, AUT);
        promise.then((response) => {
            setDisabled(false);
            setUpdate(!update);
            setAlreadyFollow(!alreadyFollow);
        }).catch((err) => {
            alert("Ocorreu um erro ao tentar seguir esse usuário");
            setDisabled(false);
        });
    }

    function unfollow() {
        const URL = `${apiUrl}/follow?followerId=${user.userData.id}&followedId=${userId}`;
        const AUT = authorization;

        setDisabled(true);

        const promise = axios.delete(URL, [], AUT);
        promise.then((response) => {
            setDisabled(false);
            setUpdate(!update);
            setAlreadyFollow(!alreadyFollow);
        }).catch((err) => {
            alert("Ocorreu um erro ao tentar parar de seguir esse usuário");
            setDisabled(false);
        });
    }

    function createFollowButton() {
        if (alreadyFollow) {
            return (
                <Container alreadyFollow={alreadyFollow} onClick={unfollow} disabled={disabled}>
                    {disabled ? <>Unfollowing...</> : <>Unfollow</>}
                </Container>
            );
        } else {
            return (
                <Container alreadyFollow={alreadyFollow} onClick={follow} disabled={disabled}>
                    {disabled ? <>Following...</> : <>Follow</>}
                </Container>
            );
        }
    }

    const followButton = createFollowButton();

    return (
        <>
            {followButton}
        </>
    );
}

const Container = styled.button`
    position: absolute;
    right: 0;
    top: 160px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: ${props => props.alreadyFollow ? "#1877F2" : "#FFFFFF"};
    background-color: ${props => props.alreadyFollow ? "#FFFFFF" : "#1877F2"};
    width: 112px;
    height: 31px;
    border-radius: 5px;

    &:disabled {
        opacity: 0.7;
    }
`