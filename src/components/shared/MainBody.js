import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Header } from "../shared/Header";
import { PublishPost } from "../shared/PublishPost";
import { Post } from "../shared/Post";
import UserContext from "../../contexts/UserContext";
import styled from "styled-components";

export default function MainBody({ title, isTimeline, route }) {

    const { apiUrl, showLogout, setShowLogout, authorization } = useContext(UserContext);

    const [postsArray, setPostsArray] = useState([]);

    useEffect(() => {
        //acho que seria legal esse get ser autenticado
        const URL = `${apiUrl}/${route}`;
        const promise = axios.get(URL);
        promise.then((response) => {
            setPostsArray(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    function showPublishPost() {
        if(isTimeline) {
            return (
                <>
                    <PublishPost />
                </>
            );
        } else {
            return (<></>)
        }
    }

    const publishPost = showPublishPost();

    return (
        <Container onClick={() => { if(showLogout) setShowLogout(false) }}>
            <Header />
            <TimelineStyled>
                <h1>
                    {title}
                </h1>
                {publishPost}
                {postsArray.length ?
                    postsArray.map((value) =>
                        <Post
                            key={value.id}
                            id={value.id}
                            url={value.url}
                            article={value.article}
                            username={value.username}
                            pictureUrl={value.pictureUrl}
                        />)
                    : <span>There are no posts yet</span>
                }
            </TimelineStyled>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #333333;
`

const TimelineStyled = styled.div`
    width: 38.1875rem;
    max-width: 100%;
    margin-top: 10rem;
    overflow: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
        width: 0;
    }

    &>h1 {
        font-weight: 700;
        font-size: 2.6875rem;
        line-height: 4rem;
        color: #FFFFFF;
    }

    &>span {
        margin: 0 auto;
        color: #FFFFFF;
    }

    @media(max-width: 68.75rem) {
        &>h1 {
            margin-left: 1rem;
        }
        margin-top: 5.6875rem;
    }
`;