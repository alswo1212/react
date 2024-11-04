import { useState, useEffect } from "react";
import { SERVER } from "const";
import PostLi from "components/post/PostLi";
import Post from "../components/post/Post";
import PageNums from "../components/post/PageNums"
import PostSave from "components/post/PostSave";

const PostList = () => {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [post, setPost] = useState(null)
    const [pageNums, setPageNums] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    useEffect(() => {
        fetch(`${SERVER}/post?page=${page}`)
            .then(rep => rep.json())
            .then(json => {
                console.log(json)
                setPosts(json.content)
                const start = json.number - (json.number % 10)
                const newPageNums = []
                for (let i = start; i < Math.min(start + 10, json.totalPages); i++) {
                    newPageNums.push(i)
                }
                setPageNums(newPageNums)
                setTotalPage(json.totalPages)
            })
    }, [page])
    return (
        <>
            <div>
                {posts.map(post => <PostLi {...post} setPost={setPost} key={post.postId} />)}
            </div>
            <PageNums pageNums={pageNums} totalPage={totalPage} setPage={setPage} />
            <PostSave />
            {post ?
                <Post {...post} />
                : <></>
            }
        </>
    )
}

export default PostList