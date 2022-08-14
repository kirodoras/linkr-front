import styled from 'styled-components';
import { IoTrash } from "react-icons/io5";
import { useContext } from "react";
import deleteModalContext from '../../contexts/deleteModalContext';

export function Trash({ id }) {

    const { setDeleteModal } = useContext(deleteModalContext);

    return (
        <TrashStyled>
            <IoTrash onClick={() => setDeleteModal({status: true, postId: id})}/>
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