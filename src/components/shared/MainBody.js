import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Header } from "../shared/Header";
import { PublishPost } from "../shared/PublishPost";
import { FollowButton } from "../shared/FollowButton";
import { Post } from "../shared/Post";
import UserContext from "../../contexts/UserContext";
import { TailSpin } from 'react-loader-spinner';
import styled from "styled-components";
import DeleteModal from "./DeleteModal";
import deleteModalContext from '../../contexts/deleteModalContext';
import { TrendingHashtags } from "./TrendingHashtags";

export default function MainBody({ title, pageName, route }) {

    const { apiUrl, showLogout, setShowLogout, authorization, update, setUpdate, user, followedUsers, setFollowedUsers, alreadyFollow, setAlreadyFollow } = useContext(UserContext);
    const { deleteModal } = useContext(deleteModalContext);
    const [postsArray, setPostsArray] = useState([]);

    const [loading, setLoading] = useState(
        <TailSpin
            color="#FFFFFF"
            width={70}
        />);

    useEffect(() => {
        const URL = `${apiUrl}/follow/${user.userData.id}`;
        const AUT = authorization;

        const promise = axios.get(URL, AUT);
        promise.then((response) => {
            setFollowedUsers(response.data)
        }).catch((err) => {
            console.log(err);
        });
    }, [update]);

    useEffect(() => {
        const URL = `${apiUrl}/${route}`;
        const AUT = authorization;

        const promise = axios.get(URL, AUT);
        promise.then((response) => {
            setPostsArray(response.data);
            setLoading(null);
        }).catch((err) => {
            console.log(err);
            setLoading(null);
        });
    }, [update, apiUrl, authorization, route, setPostsArray]);


    function showPublishPost() {
        if (pageName === "timeline") {
            return (
                <>
                    <PublishPost />
                </>
            );
        } else {
            return (<></>)
        }
    }

    function createFollowButton() {
        const userId = Number(route.replace("user/", ""));
        if(followedUsers.length > 0) {
            setAlreadyFollow(followedUsers.some((user) => user.followedId === userId));
        } else {
            setAlreadyFollow(false);
        }
        if (pageName === "userPage" && userId !== user.userData.id) {
            return (
                <FollowButton userId={userId} alreadyFollow={alreadyFollow} setAlreadyFollow={setAlreadyFollow} />
            );
        } else {
            return (<></>)
        }
    }
    
    console.log(postsArray);

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
        } else if (followedUsers.length === 0 && pageName === "timeline"){
            return (
                <>
                    <span>You don't follow anyone yet. Search for new friends!</span>
                </>
            );
        } else if (pageName === "timeline") {
            return (
                <>
                    <span>No posts found from your friends</span>
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
    const followButton = createFollowButton();

    return (
        <Container onClick={() => { if (showLogout) setShowLogout(false) }}>
            {deleteModal.status ? <DeleteModal /> : <></>}
            <Header />
            <main>
                <TimelineStyled>
                    <h1>{userPageTitle}</h1>
                    {publishPost}
                    {loading ? loading : showPosts()}
                </TimelineStyled>
                <TrendingHashtags />
                {followButton}
            </main>
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
    flex-direction: column;
    align-items: center;
    background-color: #333333;

    main {
        max-width: fit-content;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        gap: 1.5625rem;
        position: relative;
    }
`

const TimelineStyled = styled.div`
    width: 38.1875rem;
    max-height: 100%;
    max-width: 100%;
    padding-top: 132px;
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
        margin-top: 3.5rem;
        font-size: 1.8rem;
        color: #FFFFFF;
        text-align: center;
    }

    svg {
        margin-top: 1.5rem;    
    }

    @media(max-width: 68.75rem) {
        margin-top: 1rem;
        &>h1 {
            margin-left: 1rem;
        }
    }
`;