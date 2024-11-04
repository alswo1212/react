import { SERVER } from "const"
import { authFetch } from "util/fetchUtil"

const { useState } = require("react")

const Comment = ({ userName, comment, id, postRefrash }) => {
    const [newComment, setNewComment] = useState(comment)
    const [mode, setMode] = useState("view")

    // todo 댓글 수정 삭제 등록
    const commentModify = () => {
        authFetch(`${SERVER}/api/comment/${id}`, "PUT",
            { userName, comment: newComment },
            async rep => {
                if (rep.status == 200) {
                    postRefrash()
                    setMode("view")
                } else {
                    const json = await rep.json()
                    alert(json.message)
                    setNewComment(comment)
                    setMode("view")
                }
            }
        )
    }
    const commentRemove = () => {
        authFetch(`${SERVER}/api/comment/${id}`, "DELETE", null,
            async rep => {
                if (rep.status == 200) {
                    postRefrash()
                } else {
                    const json = await rep.json()
                    alert(json.message)
                    setNewComment(comment)
                    setMode("view")
                }
            }
        )
    }

    return <>
        <div style={{ marginBottom: 10 }}>
            <span style={{
                fontSize: ".8em",
                marginRight: 7,
                verticalAlign: "top",
                display: "block",
                fontWeight: "bold"
            }}
            >{userName}</span>
            {mode === 'view'
                ? <>
                    <span style={{
                        display: "inline-block",
                        width: 400,
                        overflow: "auto",
                        overflowWrap: "break-word",
                        fontSize: ".9em"
                    }}>{comment}</span>
                    {/* todo 주인일때 수정, 삭제 버튼 보이게 */}
                    {userName == sessionStorage.getItem("userName")
                        ?
                        <div style={{
                            display: "flex",
                            justifyContent: "space-around"
                        }}>
                            <button style={{
                                width: "45%",
                                border: "none",
                                color: "white",
                                background: "green",
                                borderRadius: 5
                            }} onClick={() => setMode("update")}>수정</button>
                            <button style={{
                                width: "45%",
                                border: "none",
                                color: "white",
                                background: "red",
                                borderRadius: 5
                            }} onClick={commentRemove}>삭제</button>
                        </div>
                        : null}
                </>
                : <>
                    <textarea style={{
                        display: "inline-block",
                        width: 392,
                        minHeight: 60,
                        overflow: "auto",
                        overflowWrap: "break-word",
                        fontSize: ".9em",
                        resize: "none"
                    }} value={newComment}
                        onChange={e => setNewComment(e.target.value)} />
                    {/* todo 수정 시  */}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around"
                    }}>
                        <button style={{
                            width: "45%",
                            border: "none",
                            color: "white",
                            background: "green",
                            borderRadius: 5
                        }} onClick={commentModify}>수정</button>
                        <button style={{
                            width: "45%",
                            border: "none",
                            color: "white",
                            background: "red",
                            borderRadius: 5
                        }} onClick={() => setMode("view")} >수정취소</button>
                    </div>
                </>}
        </div>

    </>
}

export default Comment