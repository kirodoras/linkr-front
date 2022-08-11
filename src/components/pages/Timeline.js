import { useState, useEffect } from "react";
import axios from "axios";
import Styled from "styled-components";
import { Header } from "../shared/Header";
import { PublishPost } from "../shared/PublishPost";
import { Post } from "../shared/Post";

export default function Timeline() {
    const [postsArray, setPostsArray] = useState([]);

    useEffect(() => {
        const URL = `http://localhost:4001/timeline`;
        const promise = axios.get(URL);
        promise.then((response) => {
            setPostsArray(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <>
            <Header />
            <TimelineStyled>
                <h1>
                    timeline
                </h1>
                <PublishPost />
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
        </>
    );
}

const TimelineStyled = Styled.div`
    width: 38.1875rem;
    max-width: 100%;
    height: 100%;
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