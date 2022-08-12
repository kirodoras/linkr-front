import MainBody from "../shared/MainBody";
import { useParams } from 'react-router-dom';

export default function UserPage() {
    const { id } = useParams(); 

    return (
        <>
            <MainBody title={"user's page"} isTimeline={false} route={`user/${id}`} />
        </>
    );
}