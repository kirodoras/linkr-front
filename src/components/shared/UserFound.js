import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import defaultAvatar from '../../assets/default-avatar.png';
import UserContext from "../../contexts/UserContext";

export default function UserFound({ id, userPicture, username, setSearch }) {
    const { followedUsers } = useContext(UserContext);

    const followed = followedUsers.some((user) => user.followedId === id)

    const navigate = useNavigate();

    return ( 
        <Container onClick={() => {
            setSearch('');
            navigate(`/user/${id}`);
            }}>
            <img src={userPicture ? userPicture : defaultAvatar} alt="Avatar" />
            <h3>{username}</h3>
            {followed ? <h4>• following</h4> : <></>}
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
        margin-right: 7px;
    }

    h4 {
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #C5C5C5;
    }

    &:hover {
        background-color: #adadad;
    }
`