import { SERVER } from "const";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostSave = ({ saveTrigger }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [mode, setMode] = useState("")
    const navi = useNavigate()

    const cancel = () => {
        setMode("")
        setTitle("")
        setContent("")
    }

    const saveClick = () => {
        if (mode === 'view') {
            // 저장 로직
            const userName = sessionStorage.getItem("userName")
            const [_, key] = document.cookie.split("=")
            fetch(`${SERVER}/post`, {
                method: "POST",
                headers: {
                    Authorization: key,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, content, userName })
            }).then(async rep => {
                if (rep.status == 200) {
                    cancel()
                    saveTrigger()
                } else {
                    const json = await rep.json()
                    alert(json.msg)
                    sessionStorage.removeItem("userName")
                    navi("/")
                }
            })
        } else {
            setMode("view")
        }
    }

    return <>
        {mode === 'view'
            ?
            <div style={{
                border: `1px solid`,
                borderRadius: 20,
                width: 400,
                minHeight: 400,
                margin: "0 auto",
                padding: 30
            }}>
                <button style={{
                    color: "white",
                    background: "red",
                    border: "none",
                    width: 400,
                    borderRadius: 5,
                    display: "block",
                    margin: "0 auto",
                    marginBottom: 20
                }} onClick={cancel}>취소</button>
                <input style={{
                    borderBottom: "1px solid",
                    fontSize: ".9em",
                    width: 392,
                }} value={title} placeholder="title"
                    onChange={e => setTitle(e.target.value)} />
                <textarea style={{
                    minHeight: 400,
                    resize: "none",
                    width: "100%",
                    padding: 0,
                    outline: "none"
                }} value={content} placeholder="content"
                    onChange={e => setContent(e.target.value)}
                ></textarea>
            </div>
            : null
        }
        <button style={{
            color: "white",
            background: "blue",
            border: "none",
            width: 400,
            borderRadius: 5,
            display: "block",
            margin: "0 auto"
        }} onClick={saveClick}>글쓰기</button>
    </>
}

export default PostSave;