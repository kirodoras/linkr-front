import MainBody from "../shared/MainBody";
import { useParams } from 'react-router-dom';

export default function UserPage() {
    const { id } = useParams(); 

    return (
        <>
            <MainBody title={null} isTimeline={false} route={`user/${id}`} />
        </>
    );
}