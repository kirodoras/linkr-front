import Styled from "styled-components";
import { Header } from "../shared/Header";

export default function Timeline() {
    return (
        <>
            <Header />
            <TimelineStyled>
                <h1>
                    timeline
                </h1>
            </TimelineStyled>
        </>
    );
}

const TimelineStyled = Styled.div`
    width: 611px;
    height: 100%;
    margin-top: 160px;

    &>h1 {
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
    }
`;