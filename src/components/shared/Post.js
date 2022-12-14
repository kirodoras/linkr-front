import styled from "styled-components";
import defaultImage from "../../assets/default-image.png";
import defaultAvatar from '../../assets/default-avatar.png';
import { Heart } from "./Heart";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { useContext, useState, useRef, useEffect } from "react";
import { IoTrash, IoPencil, IoPaperPlaneOutline } from "react-icons/io5";
import deleteModalContext from '../../contexts/deleteModalContext';
import axios from "axios";
import { HashtagText } from "./HashtagText";
import { Share } from "./Share";
import { CommentIcon } from "./CommentIcon";
import { ShareBy } from "./ShareBy";

export function Post({ userId, postId, url, article, username, pictureUrl, title, image, description, sharedBy }) {
    const { user, apiUrl, authorization, update, setUpdate } = useContext(UserContext);
    const { setDeleteModal } = useContext(deleteModalContext);

    const userData = user?.userData;

    const [articleEdit, setArticleEdit] = useState(article);
    const [disabled, setDisabled] = useState(false);
    const [disabledComment, setDisabledComment] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [comment, setComment] = useState("");
    const [commentsList, setcommentsList] = useState([]);
    const [openComments, setOpenComments] = useState(false);

    const textareaRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const URL = `${apiUrl}/comments/${postId}`;
        const AUT = authorization;

        const promise = axios.get(URL, AUT);
        promise.then((response) => {
            setcommentsList(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [apiUrl, authorization, setcommentsList, postId]);

    useEffect(() => {
        setArticleEdit(article);

        if (editMode) {
            textareaRef.current.focus();
        }
    }, [editMode, article]);

    function updateArticle(postId) {
        setDisabled(true);
        const URL = `${apiUrl}/timeline/${postId}`;
        const AUT = authorization;
        const BODY = { newArticle: articleEdit };
        const promise = axios.put(URL, BODY, AUT);
        promise.then((response) => {
            setDisabled(false);
            setEditMode(false);
            setUpdate(!update);
        }).catch((err) => {
            setDisabled(false);
            alert("N??o foi poss??vel salvar as altera????es");
        });
    }

    function createEditAndDelete() {
        if (userData.id === userId && username !== sharedBy) {
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
                        onChange={(e) => setArticleEdit(e.target.value)}
                        ref={textareaRef} />
                </Edit>
            );
        } else {
            return (
                <ArticleStyled>
                    <HashtagText article={article}></HashtagText>
                </ArticleStyled>
            );
        }
    }

    function createComments() {
        if (commentsList.length > 0 && openComments) {
            return (
                commentsList.map((comment, index) => <Comment key={index} userId={comment.userId} username={comment.username} pictureUrl={comment.pictureUrl} comment={comment.comment} />)
            );
        }
        return (<></>);
    }

    function sendComment() {
        setDisabledComment(true);
        const URL = `${apiUrl}/comment/${postId}`;
        const AUT = authorization;
        const BODY = { comment: comment };
        const promise = axios.post(URL, BODY, AUT);
        promise.then((response) => {
            setDisabledComment(false);
            setComment("");
            setUpdate(!update);
        }).catch((err) => {
            setDisabledComment(false);
            setComment("");
            alert("N??o foi poss??vel postar coment??rio");
        });
    }

    const editAndDelete = createEditAndDelete();
    const articleText = createPost();
    const showComments = createComments();

    return (
        <Container>
            <PostStyled sharedBy={sharedBy}>
                {sharedBy ? <ShareBy username={username} sharedBy={sharedBy} /> : null}
                <img src={pictureUrl ? pictureUrl : defaultAvatar} alt="Avatar" />
                <Heart id={postId} />
                <Share id={postId} />
                <CommentIcon id={postId} setOpenComments={setOpenComments} openComments={openComments} />
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
            {showComments}
            <InputComment>
                <img src={user.userData.pictureUrl ? user.userData.pictureUrl : defaultAvatar} alt="Avatar" />
                <input type="text" placeholder="write a comment..." onChange={(e) => setComment(e.target.value)} value={comment} disabled={disabledComment} />
                <IoPaperPlaneOutline onClick={sendComment}/>
            </InputComment>
        </Container>
    );
}

const InputComment = styled.div`
    width: 92%;
    height: 83px;
    margin-left: 4%;
    display: flex;
    align-items: center;
    position: relative;

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-right: 14px;
    }

    input {
        width: 100%;
        height: 39px;
        background-color: #252525;
        border-radius: 8px;
        padding: 11px 15px;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #ACACAC;
        outline: none;

        &::placeholder {
            font-style: italic;
            letter-spacing: 0.05em;
            color: #575757;
        }

        &:disabled {
            opacity: 0.7;
        }
    }

    svg {
        color: white;
        font-size: 1.3rem;
        position: absolute;
        right: 12.5px;
        top: 7px;
    }
`

const Container = styled.div`
    width: 100%;
    background-color: #1E1E1E;
    margin-bottom: 10px;
    margin-top: 2.6875rem;
    border-radius: 1rem;

    @media(max-width: 1100px) {
        border-radius: 0;
    }
`

const PostStyled = styled.div`
    position: relative;
    width: 100%;
    height: 17.25rem;

    background: #171717;
    border-radius: 1rem;

    margin-top: ${props => props.sharedBy ? "33px" : "0"};
    padding: 1rem 1.3125rem 1.25rem 1rem;

    display: flex;
    gap: 1.125rem;

    &>img {
        width: 3.125rem;
        height: 3.125rem;
        border-radius: 50%;
    }

    @media(max-width: 1100px) {
        margin-top: ${props => props.sharedBy ? "33px" : "0"};
        border-radius: 0;
    }
`;

const PostContentStyled = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const LinkContentStyled = styled.a`
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

const UsernameStyled = styled.span`
    width: fit-content;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    @media(max-width: 1100px) {
        font-size: 17px;
        line-height: 20px;
    }
`;

const ArticleStyled = styled.span`
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

const TitleStyled = styled.span`
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

const DescriptionStyled = styled.span`
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

const UrlStyled = styled.span`
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

const Edit = styled.div`
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
`;

const EditDelete = styled.div`
    position: absolute;
    top: -0.6875rem;
    right: 1.25rem;
    svg {
        color: white;
        font-size: 1.6rem;
        margin-left: 10px;
    }
`;

