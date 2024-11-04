import { SERVER } from "const"
import { login } from "modules/loca"
import { loginType } from "modules/user"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const User = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(login())
    })

    const [loginUserName, setloginUserName] = useState('')
    const [loginPassword, setloginPassword] = useState('')
    const [signupUserName, setsignupUserName] = useState('')
    const [signupPassword, setsignupPassword] = useState('')
    const loginRef = useRef()
    const signupRef = useRef()
    const navi = useNavigate()

    const userLogin = () => {
        fetch(`${SERVER}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: loginUserName,
                password: loginPassword
            }),

        }).then(async rep => {
            if (rep.status == 200) {
                const token = rep.headers.get("Authorization")
                document.cookie = `Authorization=${token}`
                sessionStorage.setItem("userName", loginUserName)
                navi("/")
            } else {
                const err = await rep.json()
                throw new Error(err.msg)
            }
        }).catch(e => {
            loginRef.current.innerText = e.message
        })
    }
    const signup = () => {

    }
    return <>
        <div style={{
            display: "flex",
        }}>
            <div>
                <h4>로그인</h4>
                <input type="text" placeholder="username"
                    onChange={e => setloginUserName(e.target.value)} />
                <input type="password" placeholder="password"
                    onChange={e => setloginPassword(e.target.value)} />
                <p style={{ color: "red" }} ref={loginRef}></p>
                <button onClick={userLogin}>login</button>
            </div>
            {/* <hr /> */}
            <div>
                <h4>회원가입</h4>
                <input type="text" placeholder="username"
                    onChange={e => setsignupUserName(e.target.value)} />
                <input type="password" placeholder="password"
                    onChange={e => setsignupPassword(e.target.value)} />
                <p ref={signupRef}></p>
                <button onClick={signup}>signup</button>
            </div>
        </div>
    </>
}

export default User