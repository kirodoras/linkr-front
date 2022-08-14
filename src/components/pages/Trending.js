import React from 'react'
import styled from "styled-components";
import Hashtag from './Hashtag.js';

export default function Trending({hashtagList}) {
  return (
    <Container>
        <TrendingBox>
            <Title>
                Trending
            </Title>
            <Separator>
                <TrendingList>
                    {
                        (hashtagList?.map((item,index)=><Hashtag hashtag_name={'#'+item.name} hashtagList={hashtagList}/>) )
                    }
                </TrendingList>
            </Separator>
        </TrendingBox>
    </Container>
  )
}

const Container = styled.div`
    display:flex;
    width: 301px;
    padding-left: 25px;
`

const TrendingBox = styled.div`
    height: 406px;
    width: 100%;
    background: #171717;
    border-radius: 16px;
    display: flex;
    flex-direction:column;
    justify-content: flex-start;
    top: 100px;
    word-break: break-all;
    padding: 9px 2px 30px 0px;
    @media (max-width: 800px) {
        display: none;
`

const Title = styled.h1`
    width: 95px;
    height: 40px;
    color: red;
    font-weight: 700;
    font-size: 700px;
    font-family: 'Oswald';
`

const TrendingList = styled.div`
    display:flex;
    font-size:19px;
    flex-direction:column;
    margin-left:16px;
    gap:15px;
    li {
        margin-left: auto;
    }

`
const Separator = styled.hr`
    width:100%;
    margin-top: 12px;
    margin-bottom:22px;
    border: 1px solid #484848;
`