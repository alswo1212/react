import { useState } from "react"
import { SERVER } from "const"

const PostLi = ({ postId, title, userName, getPost }) => {
    const [hover, setHover] = useState(false)

    return <div style={{
        padding: 10,
        marginBottom: 10,
        border: `1px solid`,
        borderRadius: 15,
        boxShadow: `${hover ? '1px 1px 4px 1px gray' : 'none'}`,
        background: `${hover ? '#c6c7c8' : 'none'}`

    }} onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        <span style={{
            width: 40,
            display: "inline-block",
            textAlign: "right",
            marginRight: 10,
            fontSize: ".9em"
        }}>
            {postId}
        </span>
        <div style={{
            width: 400,
            display: "inline-block",
            fontSize: "1.2em",
        }}>
            <span style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                cursor: "pointer",
            }} onClick={() => getPost(postId)}>
                {title}
            </span>
        </div>
        <span style={{
            fontSize: ".9em"
        }}>
            {userName}
        </span>
    </div>
}

export default PostLi