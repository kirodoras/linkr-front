import styled from 'styled-components';
import { IoTrash } from "react-icons/io5";

export function Trash({ id }) {
    return (
        <TrashStyled>
            <IoTrash />
        </TrashStyled>
    );
}

const TrashStyled = styled.div`
    position: absolute;
    top: -0.6875rem;
    right: 1.25rem;
    svg {
        color: white;
        font-size: 1.6rem;
    }
`;