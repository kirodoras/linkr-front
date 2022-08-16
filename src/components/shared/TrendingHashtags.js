import styled from "styled-components";

export function TrendingHashtags(){
    return(
        <TrendingStyled>

        </TrendingStyled>
    );
}

const TrendingStyled = styled.div`
    width: 18.8125rem;
    height: 396px;
    background: #171717;
    border-radius: 1rem;
    margin-top: 16.5rem;
    @media(max-width: 68.75rem) {
        & {
            display: none;
        }
    }
`;