import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Header } from "../shared/Header";
import { PublishPost } from "../shared/PublishPost";
import { Post } from "../shared/Post";
import UserContext from "../../contexts/UserContext";
import { TailSpin } from 'react-loader-spinner';
import styled from "styled-components";

export default function MainBody({ title, isTimeline, route }) {

    const { apiUrl, showLogout, setShowLogout, authorization } = useContext(UserContext);

    const [update, setUpdate] = useState(false);

    const [loading, setLoading] = useState(
        <TailSpin
            color="#FFFFFF"
            width={70}
        />);

    const [postsArray, setPostsArray] = useState([]);
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        //acho que seria legal esse get ser autenticado
        const URL = `${apiUrl}/${route}`;
        console.log(route);
        const promise = axios.get(URL);
        promise.then((response) => {
            setPostsArray(response.data);
            setLoading(null);
        }).catch((err) => {
            console.log(err);
            setLoading(null);
        });
    }, [update, apiUrl, authorization, route]);
    

    function showPublishPost() {
        if (isTimeline) {
            return (
                <>
                    <PublishPost update={update} setUpdate={setUpdate} />
                </>
            );
        } else {
            return (<></>)
        }
    }

    function showPosts() {
        if (postsArray.length > 0 && postsArray[0].postId !== null) {
            return (
                <>
                    {postsArray.map((value) =>
                        <Post
                            key={value.postId}
                            userId={value.userId}
                            postId={value.postId}
                            url={value.url}
                            article={value.article}
                            username={value.username}
                            pictureUrl={value.pictureUrl}
                            title={value.title}
                            image={value.image}
                            description={value.description}
                        />)}
                </>
            );
        } else {
            return (
                <>
                    <span>There are no posts yet</span>
                </>
            );
        }
    }

    function createUserPageTitle() {
        if (title) {
            return (
                <>{title}</>
            );
        } else if (postsArray.length > 0) {
            return (
                <UserPageTitle>
                    <img src={postsArray[0].pictureUrl} alt="picture profile" />
                    <h1>{postsArray[0].username}'s posts</h1>
                </UserPageTitle>
            );
        }
    }

    const publishPost = showPublishPost();
    const userPageTitle = createUserPageTitle();

    return (
        <Container onClick={() => { if (showLogout) setShowLogout(false) }}>
            <Header />
            <TimelineStyled>
                <h1>
                    {userPageTitle}
                </h1>
                {publishPost}
                {loading ? loading : showPosts()}
            </TimelineStyled>
        </Container>
    );
}

const UserPageTitle = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0 18px;
    }

    h1 {
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
    }
`

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
    display: flex;
    flex-direction: column;
    align-items: center;

    ::-webkit-scrollbar {
        width: 0;
    }

    &>h1 {
        width: 100%;
        align-self: left;
        font-weight: 700;
        font-size: 2.6875rem;
        line-height: 4rem;
        color: #FFFFFF;
    }

    &>span {
        margin-top: 1.5rem;
        font-size: 1.8rem;
        color: #FFFFFF;
    }

    svg {
        margin-top: 1.5rem;    
    }

    @media(max-width: 68.75rem) {
        &>h1 {
            margin-left: 1rem;
        }
        margin-top: 5.6875rem;
    }
`;