import { useEffect, useState } from "react"
import Comment from "./Comment"
import { authFetch } from "util/fetchUtil"
import { SERVER } from "const"
import { useNavigate } from "react-router-dom"

const Post = ({ postId, title, content, userName, comments, getPost, deleteRefrash }) => {
    const [mode, setMode] = useState("view")
    const [newContent, setNewContent] = useState(content)
    const [newTitle, setNewTitle] = useState(title)
    const [newComment, setNewComment] = useState("")

    useEffect(() => {
        setMode('view')
        setNewComment("")
        setNewTitle(title)
        setNewContent(content)
    }, [postId])

    const postRefrash = () => {
        getPost(postId)
        setMode("view")
    }

    // 댓글 저장, 게시글 수정, 삭제
    const commentSave = () => {
        authFetch(`${SERVER}/api/comment`, "POST",
            { comment: newComment, postId },
            async rep => {
                if (rep.status == 200) {
                    postRefrash()
                    setNewComment("")
                } else {
                    const json = await rep.json()
                    alert(json.message)
                }
            })
    }
    const postModify = () => {
        authFetch(`${SERVER}/post/${postId}`, "PUT",
            { postId, content: newContent, title: newTitle, userName },
            async rep => {
                if (!rep.ok) {
                    const json = await rep.json()
                    alert(json.message)
                }
                postRefrash()
            }
        )
    }
    const postRemove = () => {
        authFetch(`${SERVER}/post/${postId}`, "DELETE",
            null, rep => {
                if (rep.ok)
                    deleteRefrash()
            }
        )
    }

    const postModifyCancel = () => {
        setMode('view')
        setNewTitle(title)
        setNewContent(content)
    }
    return <>
        <hr />
        <div style={{
            border: `1px solid`,
            borderRadius: 20,
            width: 400,
            minHeight: 500,
            margin: "0 auto",
            padding: 30
        }}>
            {mode == "view"
                ? <>
                    <div style={{
                        borderBottom: "1px solid",
                        fontSize: "1.1em",
                        padding: 10
                    }}>
                        {userName == sessionStorage.getItem("userName")
                            ? <div style={{ float: "right" }}>
                                <button style={{
                                    fontSize: ".6em",
                                    marginRight: 10
                                }}
                                    onClick={() => setMode("update")}>수정</button>
                                <button style={{ fontSize: ".6em" }}
                                    onClick={postRemove}>삭제</button>
                            </div>
                            : null}

                        <div style={{
                            width: 400,
                            display: "inline-block"
                        }}>
                            {title}
                        </div>
                    </div>
                    <textarea style={{
                        minHeight: 400,
                        resize: "none",
                        width: "100%",
                        padding: 0,
                        outline: "none"
                    }} readOnly={true} value={content}
                    ></textarea>
                </>
                : <>
                    <div style={{ float: "right" }}>
                        <button style={{
                            fontSize: ".6em",
                            marginRight: 10
                        }}
                            onClick={postModify}>수정</button>
                        <button style={{ fontSize: ".6em" }}
                            onClick={postModifyCancel}>수정취소</button>
                    </div>
                    <input style={{
                        borderBottom: "1px solid",
                        fontSize: ".9em",
                        width: 392,
                    }} value={newTitle}
                        onChange={e => setNewTitle(e.target.value)} />
                    <textarea style={{
                        minHeight: 400,
                        resize: "none",
                        width: "100%",
                        padding: 0,
                        outline: "none"
                    }} value={newContent}
                        onChange={e => setNewContent(e.target.value)}
                    ></textarea>
                </>
            }
            {comments.map(comm => <Comment {...comm} postRefrash={postRefrash} key={comm.id} />)}
            {sessionStorage.getItem("userName")
                ?
                <div>
                    <textarea value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        style={{
                            width: 392,
                            fontSize: ".9em",
                            minHeight: 60,
                            resize: "none",
                            outline: "none"
                        }} />
                    <button style={{
                        color: "white",
                        background: "blue",
                        border: "none",
                        width: 400,
                        borderRadius: 5
                    }} onClick={commentSave}>댓글 등록</button>
                </div>
                : null}
        </div>
    </>
}

export default Post