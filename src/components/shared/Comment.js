import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import defaultAvatar from '../../assets/default-avatar.png';
import UserContext from "../../contexts/UserContext";

export default function UserFound({ userId, username, pictureUrl, comment }) {
    const { followedUsers } = useContext(UserContext);

    const followed = followedUsers.some((user) => user.followedId === userId)

    const navigate = useNavigate();

    return ( 
        <Container>
            <img src={pictureUrl ? pictureUrl : defaultAvatar} alt="Avatar" />
            <CommentArea>
                <div>
                    <h3 onClick={() => navigate(`/user/${userId}`)}>{username}</h3>
                    {followed ? <h4>• following</h4> : <></>}
                </div>
                <h2>{comment}</h2>
            </CommentArea>
        </Container>
    );
   
}

const Container = styled.div`
    width: 90%;
    height: 71px;
    display: flex;
    align-items: center;
    margin-left: 5%;
    border-bottom: 1px solid #353535;

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-right: 18px;
    }
`

const CommentArea = styled.div`
    display: flex;
    flex-direction: column;

    div {
        display: flex;
        margin-bottom: 4px;
    }

    h3 {
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #F3F3F3;
        margin-right: 4px;
    }

    h4 {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #565656;
    }

    h2 {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #ACACAC;
    }
`