import Styled from "styled-components";
import defaultAvatar from '../../assets/default-avatar.png';

export function Post() {
    const username = 'Juvenal Juvêncio';
    const article = 'Muito maneiro esse tutorial de Material UI com React, deem uma olhada';
    const url = 'https://i.pinimg.com/564x/b5/67/08/b567089c804ad4ea0b5b1eb924baa022.jpg';
    const title = 'Como aplicar o Material UI em um projeto React';
    const description = 'Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page. I hope you enjoy it!';
    const picture = defaultAvatar;

    return (
        <PublishPostStyled>
            <img src={defaultAvatar} alt="Avatar" />
            <PostContentStyled>
                <UsernameStyled>{username}</UsernameStyled>
                <ArticleStyled>{article}</ArticleStyled>
                <LinkContentStyled href={url} target="_blank" rel="noopener noreferrer">
                    <TitleStyled>{title}</TitleStyled>
                    <DescriptionStyled>{description}</DescriptionStyled>
                    <UrlStyled>{url}</UrlStyled>
                    <img src={picture} alt="Url logo" />
                </LinkContentStyled>
            </PostContentStyled>
        </PublishPostStyled>
    );
}

const PublishPostStyled = Styled.div`
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

