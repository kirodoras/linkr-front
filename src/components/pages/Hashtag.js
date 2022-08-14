import axios from 'axios';
import React from 'react'
import styled from "styled-components";
export default function Hashtag({hashtag_name,hashtagList}) {
  console.log(hashtagList)
  
  return (
    <>
    <a href={`/hashtag/${hashtag_name.substr(1)}`}>
      <Hashtag_sidebar>
        {hashtag_name}
      </Hashtag_sidebar>
 
    </a>
    </>
  )
}

const Hashtag_sidebar = styled.span`
  color: white;
  font-weight: bold;
  font-family: 'Lato';
  :hover {
    color: #1877f2;
    cursor: pointer;
  }
`
const Sidebar = styled.div`
  position:fixed;
  background-color: pink;
`