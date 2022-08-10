import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from "axios";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function SignUp() {
    const { setUser, apiUrl } = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');

    const [loading, setLoading] = useState(false);

    function signUp(event) {
        event.preventDefault();

        setLoading(true);

        if(!email || !password || !username || !pictureUrl) {
            alert("todos os campos precisam ser preenchidos");
            setLoading(false);
        } else {
            const body = {
                email,
                password,
                username,
                pictureUrl
            }
    
            const promise = axios.post(`${apiUrl}/sign-up`, body);
    
            promise
                .then(res => {
                    setUser(res.data);
                    navigate("/");
                }).catch((err) => {
                    alert(err.response.data);
                    setLoading(false);
                })
        }
    }

    function createForm() {
        if (!loading) {
            return (
                <>
                    <Input type="email" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <Input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                    <Input type="text" placeholder="picture url" onChange={(e) => setPictureUrl(e.target.value)} value={pictureUrl} />
                    <Button type="submit">Sign Up</Button>
                </>
            )
        } else {
            return (
                <>
                    <Input type="email" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} value={email} disabled={true} />
                    <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={true} />
                    <Input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username} disabled={true} />
                    <Input type="text" placeholder="picture url" onChange={(e) => setPictureUrl(e.target.value)} value={pictureUrl} disabled={true} />
                    <Button type="submit" disabled={true}><ThreeDots height={70} width={70} color="#FFFFFF" /></Button>
                </>
            )
        }
    }

    const loginForm = createForm();

    return (
        <Container>
            <Title>
                <h1>linkr</h1>
                <h2>save, share and discover the best links on the web</h2>
            </Title>
            <Forms>
                <form onSubmit={signUp}>
                    {loginForm}
                </form>
                <h6 onClick={() => navigate("/")}>Switch back to log in</h6>
            </Forms>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    background-color: #333333;

    @media(max-width: 1100px) {
        flex-direction: column;
    }
`

const Title = styled.div`
    width: calc(100% - 475px);
    height: 100vh;
    background-color: #151515;
    display: flex;
    flex-direction: column;
    padding: 150px 0 0 120px;

    h1 {
        font-weight: 700;
        font-size: 106px;
        line-height: 117px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }

    h2 {
        width: 460px;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
    }

    @media(max-width: 1100px) {
        width: 100%;
        height: 175px;
        padding: 0;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        h1 {
            font-size: 76px;
            line-height: 84px;
        }

        h2 {
            width: 250px;
            font-size: 23px;
            line-height: 34px;
        }
    }
`

const Forms = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 475px;

    form {
        display: flex;
        flex-direction: column;
    }
    
    h6 {
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        margin-top: 22px;
        text-decoration-line: underline;
        color: #FFFFFF;
    }

    @media(max-width: 1100px) {
        width: 100%;
        min-height: calc(100vh - 175px);
        justify-content: start;

        form {
            margin-top: 40px;
        }

        h6 {
            font-size: 17px;
            line-height: 20px;
        }
    }
`

const Input = styled.input`
    width: 380px;
    height: 60px;
    border: 1px solid #D5D5D5;
    border-radius: 6px;
    padding: 11px 15px;
    font-size: 20px;
    margin-bottom: 13px;

    &::placeholder {
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #9F9F9F;
    }

    &:disabled {
        background-color: #F2F2F2;
        color: #AFAFAF;
    }

    @media(max-width: 1100px) {
        width: 330px;
        height: 55px;

        &::placeholder {
            font-size: 22px;
            line-height: 33px;
        }
    }
`

const Button = styled.button`
    width: 380px;
    height: 60px;
    border-radius: 6px;
    border: none;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;
    background-color: #1877F2;
    display: flex;
    justify-content: center;
    align-items: center;

    &:disabled {
        opacity: 0.7;
    }

    @media(max-width: 1100px) {
        width: 330px;
        height: 55px;
        font-size: 22px;
        line-height: 33px;
    }
`