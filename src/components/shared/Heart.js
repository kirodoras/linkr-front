import styled from 'styled-components';
import { FaRegHeart, FaHeart, FaHeartBroken } from 'react-icons/fa';
import { useState, useContext, useEffect, useCallback } from 'react';
import UserContext from "../../contexts/UserContext";
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

export function Heart({ id }) {
    const [clicked, setClicked] = useState(false);
    const [likes, setLikes] = useState();
    const [loading, setLoading] = useState(false);
    const { user, apiUrl, authorization, update, setUpdate } = useContext(UserContext);
    const [toolTip, setToolTip] = useState();

    const populateTooTip = useCallback((data) => {
        const userId = user?.userData.id;
        let text = "";

        if (data.length === 0) {
            text = "seja o primeiro a curtir!";
        } else {
            if (data.length === 1 && data.filter(value => value.userId === userId).length) {
                text = "parabens, voce foi o primeiro a curtir!"
            } if (data.length === 1) {
                text = `${data[0].username} curtiu`
            } else {
                if (data.length === 2 && data.filter(value => value.userId === userId).length) {
                    if (data.filter(value => value.userId === userId).length) {
                        text += "Voce e outra pessoa curtiu"
                    }
                } else {

                    let i = 0;
                    if (data.filter(value => value.userId === userId).length) {
                        text += "Voce, "
                    } else {
                        while (data[i].userId === userId) {
                            i++;
                        }
                        text += `${data[i].username}, `;
                    }
                    let j = 0;
                    while (data[j].userId === userId || data[i].username === data[j].username) {
                        console.log("a")
                        j++;
                    }
                    text += `${data[j].username} e outras ${data.length - 2} pessoas`;
                }
            }
        }
        setToolTip(text);
    }, [user]);

    useEffect(() => {
        const userId = user?.userData.id;
        const URL = `${apiUrl}/like?postId=${id}`;
        const promise = axios.get(URL);
        promise.then((res) => {
            setLikes(res.data);
            populateTooTip(res.data);
            if (res.data.filter(value => value.userId === userId).length) {
                setClicked(true);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [user, apiUrl, id, populateTooTip]);

    function click() {
        const userId = user?.userData.id;
        const postId = id;
        const AUT = authorization;
        const BODY = { userId, postId };

        setLoading(true);
        if (!clicked) {
            axios.post(`${apiUrl}/like`, BODY, AUT)
                .then((res) =>
                    setClicked(true)
                ).catch(err => {
                    console.log(err)
                })
        } else {
            axios.delete(`${apiUrl}/like?userId=${userId}&postId=${postId}`, [], AUT)
                .then((res) =>
                    setClicked(false)
                )
        }

        axios.get(`${apiUrl}/like?postId=${id}`)
            .then((res) => {
                setLikes(res.data);
                populateTooTip(res.data);
            }
            ).catch(err =>
                console.log(err)
            );
        setLoading(false);
        setUpdate(!update);
    }

    return (
        <Container onClick={() => click()} heartColor={clicked}>
            <div>
                {loading ? <FaHeartBroken /> : (clicked ? <FaHeart /> : <FaRegHeart />)}
            </div>
            <div>
                <p data-tip={`${toolTip}`}>{likes?.length} likes</p>
                <ReactTooltip place="bottom" type="light" effect="solid" />
            </div>
        </Container>
    )
}

const Container = styled.div`
    color: ${props => props.heartColor ? "red" : "white"};
    position: absolute;
    
    display: flex;
    align-items: center;
    flex-direction: column;
    top: 30%;
    left: calc((0.00415 * 100%) + 1rem);

    p {
        color: white
    }
`