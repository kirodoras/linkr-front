import MainBody from "../shared/MainBody";
import { useParams } from 'react-router-dom';

export default function HashtagPage() {
    const { hashtag } = useParams(); 

    return (
        <>
            <MainBody title={`# ${hashtag}`} pageName={"hashtag"} route={`hashtag/${hashtag}`} />
        </>
    );
}