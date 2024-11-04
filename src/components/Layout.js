import "css/layout.css"
import { useSelector } from "react-redux"
import { HOME, LOGIN } from "modules/loca"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
function Layout(props) {
    const nowPath = useSelector(state => state.setLocation.path)
    const userName = sessionStorage.getItem("userName")
    const navi = useNavigate()
    return (
        <>
            <header style={{
                width: 600,
                margin: "0 auto",

            }}>
                {nowPath === HOME
                    ? <>
                        {userName ? <span>{userName}님 반갑습니다.</span>
                            : <button onClick={() => navi(LOGIN)}>로그인/회원가입</button>}

                    </>
                    : <button onClick={() => navi(HOME)}>게시글</button>
                }
            </header>
            <div id="layout">
                {props.children}
            </div>
        </>
    )
}

export default Layout