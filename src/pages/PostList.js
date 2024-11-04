import { useState, useEffect } from "react";
import { SERVER } from "const";
import PostLi from "components/post/PostLi";
import Post from "../components/post/Post";
import PageNums from "../components/post/PageNums"
import PostSave from "components/post/PostSave";
import { useDispatch, useSelector } from "react-redux";
import { home } from "modules/loca";

const PostList = () => {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [post, setPost] = useState(null)
    const [pageNums, setPageNums] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [saveCnt, setSaveCnt] = useState(0)
    const saveTrigger = () => setSaveCnt(it => it + 1)
    const deleteRefrash = () => {
        saveTrigger()
        setPost(null)
    }

    const nowPath = useSelector(state => state.setLocation.path)
    const dispatch = useDispatch()
    const getPost = (postId) => {
        fetch(`${SERVER}/post/${postId}`)
            .then(rep => rep.json())
            .then(json => setPost(json))
    }

    useEffect(() => {
        fetch(`${SERVER}/post?page=${page}`)
            .then(rep => rep.json())
            .then(json => {
                setPosts(json.content)
                const start = json.number - (json.number % 10)
                const newPageNums = []
                for (let i = start; i < Math.min(start + 10, json.totalPages); i++) {
                    newPageNums.push(i)
                }
                setPageNums(newPageNums)
                setTotalPage(json.totalPages)
            })
        dispatch(home())
    }, [page, saveCnt])
    return (
        <>
            <div>
                {posts.map(post => <PostLi {...post} setPost={setPost} key={post.postId} getPost={getPost} />)}
            </div>
            <PageNums pageNums={pageNums} totalPage={totalPage} setPage={setPage} />
            <PostSave saveTrigger={saveTrigger} />
            {post ?
                <Post {...post} getPost={getPost} deleteRefrash={deleteRefrash} />
                : <></>
            }
        </>
    )
}

export default PostList