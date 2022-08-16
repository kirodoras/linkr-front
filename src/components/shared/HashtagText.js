import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";

export function HashtagText({ article }) {

    const navigate = useNavigate();

    const tagStyle = {
        color: 'white',
        fontWeight: 700,
        cursor: 'pointer'
    };

    const mentionStyle = {
        color: 'white',
        textDecoration: 'underline',
        cursor: 'pointer'
    }

    function tagClicked(tag) {
        let hashtag = tag.substring(1);
        navigate(`/hashtag/${hashtag}`);
    }

    return (
        <ReactTagify
            tagStyle={tagStyle}
            mentionStyle={mentionStyle}
            tagClicked={tagClicked}
        >
            {article}
        </ReactTagify>
    );
}