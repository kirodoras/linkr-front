import Styled from "styled-components";
import { Header } from "../shared/Header";
import { PublishPost } from "../shared/PublishPost";
import { Post } from "../shared/Post";

export default function Timeline() {
    return (
        <>
            <Header />
            <TimelineStyled>
                <h1>
                    timeline
                </h1>
                <PublishPost />
                <Post />
                <Post />
                <Post />
                <Post />
            </TimelineStyled>
        </>
    );
}

const TimelineStyled = Styled.div`
    width: 38.1875rem;
    max-width: 100%;
    height: 100%;
    margin-top: 10rem;
    overflow: hidden;
    overflow-y: scroll;
    &>h1 {
        font-weight: 700;
        font-size: 2.6875rem;
        line-height: 4rem;
        color: #FFFFFF;
    }

    @media(max-width: 68.75rem) {
        &>h1 {
            margin-left: 1rem;
        }
        margin-top: 5.6875rem;
    }
`;