import { ReactTagify } from "react-tagify";

export function HashtagArticle({ article }) {
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

    function tagClicked(event) {
        console.log(event)
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