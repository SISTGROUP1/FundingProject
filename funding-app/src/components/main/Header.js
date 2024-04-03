import { useRef, useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import apiClient from "../../http-commons"

export const Header = () => {
    const [id, setId] = useState('')
    const [pwd, setPwd] = useState('')
    const idRef = useRef(null)
    const pwdRef = useRef(null)
    const [btnClicked, setBtnClicked] = useState(false)
    const { refetch: login } = useQuery(
        'login',
        async () => {
            return await apiClient.post(`/member/login`, {
                id: id,
                pwd: pwd
            })
        }, {
            enabled: btnClicked,
            onSuccess: (response) => {
                if (response.data.msg === 'OK') {
                    window.sessionStorage.setItem('id', response.data.member.id)
                    window.sessionStorage.setItem('name', response.data.member.name)
                } else if (response.data.msg === 'NOID') {
                    alert('ID가 존재하지 않습니다.')
                    setId('')
                    setPwd('')
                    idRef.current.focus()
                } else if (response.data.msg === 'NOPWD') {
                    alert('비밀번호가 일치하지 않습니다.')
                    setPwd('')
                    pwdRef.current.focus()
                }
            }
        }, {
            onError: (error) => {
                console.log(error.response)
            }
        }
    )

    const loginBtn = () => {
        if (id.trim() === '') {
            idRef.current.focus()
            return
        }
        if (pwd.trim() === '') {
            pwdRef.current.focus()
            return
        }
        setBtnClicked(true)
        login()
    }

    const logoutBtn = () => {
        window.sessionStorage.clear()
        setId('')
        setPwd('')
        window.location.href="/"
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" data-spy="affix" data-offset-top="0">
            <div className="container">
                <a className="navbar-brand" href="#"><img src="assets/imgs/logo.svg" alt="" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/funding/search"}>Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/board/list"}>Board</Link>
                        </li>
                        {
                            !window.sessionStorage.getItem('id') &&
                            <li className="nav-item">
                                ID : <input type="text" size={12} className="input-sm" placeholder="ID" ref={idRef} value={id} onChange={(e) => setId(e.target.value)} />&nbsp;
                                PW : <input type="password" size={12} className="input-sm" placeholder="PW" ref={pwdRef} value={pwd} onChange={(e) => setPwd(e.target.value)} />&nbsp;
                                <button class="btn btn-outline-primary btn-sm" onClick={loginBtn}>Login</button>
                            </li>
                        }
                        {
                            window.sessionStorage.getItem('id') &&
                            <li className="nav-item">
                                {window.sessionStorage.getItem('name')}님, 환영합니다.&nbsp;
                                <button class="btn btn-outline-primary btn-sm" onClick={logoutBtn}>Logout</button>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}