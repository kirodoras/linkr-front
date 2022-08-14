import React from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios'
import  Header from "../shared/Header.js";
import SearchBar from '../shared/SearchBar.js'
import Styled from "styled-components";
import Trending from '../pages/Trending.js'
import Timeline from '../pages/Timeline.js'
import { AiOutlineSearch } from 'react-icons/ai';
import Swal from 'sweetalert2' //biblioteca que estiliza alerta
import TimelinePage from '../pages/TimelinePage.js'

export default function Home() {
    const {hashtag} = useParams()
    const [trendingList,setTrendingList] = React.useState([])

    React.useEffect(() => {
        const promise = axios.get('http://localhost:4000/hashtag/trending');

        promise.then(response => {
            let hashtags = response.data;
            setTrendingList([...hashtags]);
            console.log(trendingList)
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: "OOPS...",
                text: "Ocorreu um erro ao carregar os Trendings Hashtags. Tente novamente",
            });
        });

    }, [])
    console.log(trendingList)
  return (
    <>
    <Header />
    <Container>
        <BoxforInput>
            <SearchBar />
            <BoxIconInput><AiOutlineSearch /></BoxIconInput>
            </BoxforInput>
            <Title>
                {hashtag ? "#"+hashtag : 'Timeline'}
            </Title>
            <Main>
                <Timeline setTrendingList={setTrendingList}/>
                {trendingList.length>0 && <Trending hashtagList={trendingList}/>}
            </Main>
        
    </Container>
    </>
  )
}



    const Container = Styled.div`
    width: 100%;
    max-width: 100%;
    min-height: 100vh;
    background-color: #333333;
    padding-top: 125px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
    @media (max-width: 610px) {
        padding-top: 91px;
    }
`;

    const Main = Styled.div`
    max-width: 100%;
    padding-bottom: 50px;
    
    display: flex;
`;

const Title = Styled.h1`
font-weight: 700;
font-size: 2.6875rem;
line-height: 4rem;
color: #FFFFFF;
`

    const BoxforInput = Styled.div`
    width: 100%;
    padding: 15px;
    position: relative;
    @media (min-width: 650px) {
        display: none;
    }
`;
const BoxIconInput = Styled.div`
    font-family: 'Lato';
    font-size: 19px;
    line-height: 23px;
    color: #C6C6C6;
    position: absolute;
    right: 25px;
    top: 28px;
`;