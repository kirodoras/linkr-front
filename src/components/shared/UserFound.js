import styled from "styled-components";
import defaultAvatar from '../../assets/default-avatar.png';

export default function UserFound({ id, userPicture, username, goUserPage }) {
    return ( 
        <Container onClick={() => goUserPage(id)}>
            <img src={userPicture ? userPicture : defaultAvatar} alt="Avatar" />
            <h3>{username}</h3>
        </Container>
    );
   
}

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 6px 17px;

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-right: 12px;
    }

    h3 {
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #515151;
    }

    &:hover {
        background-color: #adadad;
    }
`