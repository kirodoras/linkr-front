import Styled from "styled-components";
import defaultImage from "../../assets/default-image.png";
import defaultAvatar from '../../assets/default-avatar.png';
import { Heart } from "./Heart";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { useContext, useState, useRef, useEffect } from "react";
import { IoTrash, IoPencil } from "react-icons/io5";
import deleteModalContext from '../../contexts/deleteModalContext';
import axios from "axios";

export function Post({ userId, postId, url, article, username, pictureUrl, title, image, description, updatePosts }) {
    const { user, apiUrl, authorization, postsArray } = useContext(UserContext);
    const { setDeleteModal } = useContext(deleteModalContext);

    const token = user?.token;
    const userData = user?.userData;
    const articlePost = postsArray.find((post) => post.postId === postId).article

    const [articleEdit, setArticleEdit] = useState(articlePost);
    const [disabled, setDisabled] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setArticleEdit(articlePost);
    }, [editMode]);

    function updateArticle(postId) {
        setDisabled(true);
        const URL = `${apiUrl}/timeline/${postId}`;
        const AUT = authorization;
        const BODY = { newArticle: articleEdit };
        const promise = axios.put(URL, BODY, AUT);
        promise.then((response) => {
            setDisabled(false);
            setEditMode(false);
            updatePosts();
        }).catch((err) => {
            setDisabled(false);
            alert("Não foi possível salvar as alterações");
        });
    }

    function createEditAndDelete() {
        if (userData.id === userId) {
            return (
                <EditDelete>
                    <IoPencil onClick={() => setEditMode(!editMode)} />
                    <IoTrash onClick={() => setDeleteModal({ status: true, postId: postId })} />
                </EditDelete>
            );
        } else {
            return (<></>);
        }
    }

    function cancelOrSave(e) {
        if (e.keyCode === 27) {
            setEditMode(false);
        } else if (e.keyCode === 13) {
            updateArticle(postId);
        }     
    }

    function createPost() {
        if (editMode) {
            return (
                <Edit>
                    <textarea onKeyDown={cancelOrSave} className='article'
                    disabled={disabled}
                    type='text'
                    placeholder=''
                    value={articleEdit}
                    onChange={(e) => setArticleEdit(e.target.value)} />
                </Edit>
            );
        } else {
            return (
                <ArticleStyled>{article}</ArticleStyled>
            );
        }
    }

    const editAndDelete = createEditAndDelete();
    const articleText = createPost();

    return (
        <PostStyled>
            <img src={pictureUrl ? pictureUrl : defaultAvatar} alt="Avatar" />
            <Heart id={postId} />
            {editAndDelete}
            <PostContentStyled>
                <UsernameStyled onClick={() => navigate(`/user/${userId}`)}>{username}</UsernameStyled>
                {articleText}
                <LinkContentStyled href={url} target="_blank">
                    <TitleStyled>{title}</TitleStyled>
                    <DescriptionStyled>{description}</DescriptionStyled>
                    <UrlStyled>{url}</UrlStyled>
                    <img src={image ? image : defaultImage} alt="Url logo" />
                </LinkContentStyled>
            </PostContentStyled>
        </PostStyled>
    );
}

const Edit = Styled.div`
    margin: 10px 0 -10px 0;
    width: 100%;

    &>textarea {
        background: #FFFFFF;
        border-radius: 0.3125rem;
        height: 70px;
        width: 100%;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #4C4C4C;
        resize: none;
        outline: none;
        padding: 0.3125rem 0.8125rem 0 0.8125rem;
        word-wrap: break-word;

        &::placeholder {
            color: #949494
        }

        &:disabled {
        background-color: #F2F2F2;
        color: #AFAFAF;
        }
    }

    @media(max-width: 1100px) {
        font-size: 15px;
        line-height: 18px;
    }
`

const EditDelete = Styled.div`
    position: absolute;
    top: -0.6875rem;
    right: 1.25rem;
    svg {
        color: white;
        font-size: 1.6rem;
        margin-left: 10px;
    }
`

const PostStyled = Styled.div`
    position: relative;
    width: 100%;
    height: 17.25rem;

    background: #171717;
    box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
    border-radius: 1rem;

    margin-top: 2.6875rem;
    padding: 1rem 1.3125rem 1.25rem 1rem;

    display: flex;
    gap: 1.125rem;

    &>img {
        width: 3.125rem;
        height: 3.125rem;
        border-radius: 50%;
    }

    @media(max-width: 1100px) {
        margin-top: 1rem;
        border-radius: 0;
    }
`;

const PostContentStyled = Styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const LinkContentStyled = Styled.a`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 155px;

    border: 1px solid #4D4D4D;
    border-radius: 11px;

    padding: 20px;
    padding-right: 180px;

    position: relative;
    margin-top: 20px;

    &>img {
        position: absolute;
        right: 0;
        top: 0;

        width: 153.44px;
        max-width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        border-radius: 0px 12px 13px 0px;
    }

    &:visited {
        color: #FFFFFF;
    }

    @media(max-width: 1100px) {
        padding: 7px  100px 0 11px;
        &>img {
            width: 95px;
        }
    }
`;

const UsernameStyled = Styled.span`
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    @media(max-width: 1100px) {
        font-size: 17px;
        line-height: 20px;
    }
`;

const ArticleStyled = Styled.span`
    margin-top: 7px;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;

    @media(max-width: 1100px) {
        font-size: 15px;
        line-height: 18px;
    }
`;

const TitleStyled = Styled.span`
    max-width: 302.82px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #CECECE;
    @media(max-width: 1100px) {
        max-width: 175px;
        font-size: 11px;
        line-height: 13px;
    }
`;

const DescriptionStyled = Styled.span`
    margin-top: 5px;
    max-width: 302.82px;    
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9B9595;

    @media(max-width: 1100px) {
        max-width: 175px;
        margin-top: 3px;
        margin-top: 3px;
        font-size: 9px;
        line-height: 11px;
    }
`;

const UrlStyled = Styled.span`
    margin-top: 13px;
    max-width: 302.82px;
    word-wrap: break-word;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #CECECE;

    @media(max-width: 1100px) {
        max-width: 175px;
        font-size: 9px;
        line-height: 11px;
    }
`;

