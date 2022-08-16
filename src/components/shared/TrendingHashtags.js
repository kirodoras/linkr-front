import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { HashtagText } from "./HashtagText";

export function TrendingHashtags() {
    const { apiUrl } = useContext(UserContext);
    const [tagsArray, setTagsArray] = useState([]);
    useEffect(() => {
        const URL = `${apiUrl}/hashtag`;
        const promise = axios.get(URL);
        promise.then((response) => {
            console.log(response.data);
            setTagsArray(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [apiUrl]);

    function hashtagsContent() {
        if (tagsArray.length > 0) {
            return (
                <HashtagsStyled>
                    {tagsArray.map((value) => <HashtagText key={value.id} article={`#${value.name}`} />)}
                </HashtagsStyled>
            );
        } else {
            return (
                <span className="no-tags">There are no tags yet</span>
            );
        }
    }

    return (
        <TrendingStyled>
            <h1>trending</h1>
            {hashtagsContent()}
        </TrendingStyled>
    );
}

const TrendingStyled = styled.div`
    width: 18.8125rem;
    min-height: 296px;
    max-height: 396px;
    background: #171717;
    border-radius: 1rem;
    margin-top: 16.5rem;
    padding: 9px 16px 9px 16px; 
    color: #FFFFFF;

    h1 {
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        padding-bottom: 8px;
        border-bottom: 1px solid #484848;;
    }

    .no-tags {
        margin-top: 0.5rem;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    @media(max-width: 68.75rem) {
        & {
            display: none;
        }
    }
`;

const HashtagsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;
    margin-top: 6px;
    color: #FFFFFF;
`;