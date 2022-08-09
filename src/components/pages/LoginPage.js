import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from "axios";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function Login() {
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    function login(event) {
        event.preventDefault();

        setLoading(true);

        if(!email || !password) {
            alert("todos os campos precisam ser preenchidos");
            setLoading(false);
        } else {
            const body = {
                email,
                password
            }
    
            const promise = axios.post("http://localhost:4000/", body);
    
            promise
                .then(res => {
                    setUser(res.data);
                    navigate("/timeline");
                }).catch((err) => {
                    console.log(err.response);
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
                    <Button type="submit">Log In</Button>
                </>
            )
        } else {
            return (
                <>
                    <Input type="email" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} value={email} disabled={true} />
                    <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={true} />
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
                <form onSubmit={login}>
                    {loginForm}
                </form>
                <h6 onClick={() => navigate("/sign-up")}>First time? Create an account!</h6>
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
`

const Input = styled.input`
    width: 380px;
    height: 60px;
    border: 1px solid #D5D5D5;
    border-radius: 6px;
    padding: 11px 15px;
    font-size: 20px;
    margin-bottom: 13px;
    font-family: 'Raleway', sans-serif;
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
`