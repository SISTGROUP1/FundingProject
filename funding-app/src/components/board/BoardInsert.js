import { useRef, useState } from "react"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import apiClient from "../../http-commons"

export const BoardInsert = () => {
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [pwd, setPwd] = useState('')
    const subjectRef = useRef(null)
    const contentRef = useRef(null)
    const pwdRef = useRef(null)
    const nav = useNavigate()

    const {mutate:boardInsert}=useMutation(
        async()=>{
            return await apiClient.post(`/board/insert`,{
                name:window.sessionStorage.getItem('id'),
                subject:subject,
                content:content,
                pwd:pwd
            })
        },{
            onSuccess:(response)=>{
                if(response.data==='YES'){
                    window.location.href='/board/list'
                }
            }
        },{
            onError:(error)=>{
                console.log(error.response)
            }
        }
    )

    const boardInsertBtn = () => {
        if (subject.trim() === '') {
            subjectRef.current.focus()
            return
        }
        if (content.trim() === '') {
            contentRef.current.focus()
            return
        }
        if (pwd.trim() === '') {
            pwdRef.current.focus()
            return
        }
        boardInsert()
    }

    return (
        <section id="blog" className="section">
            <div className="container text-center" style={{"width":"40%"}}>
                <div className="row text-left">
                    <h3 style={{ "margin": "15px 0" }}>게시물 작성</h3>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th width="15%" className="text-center">제목</th>
                                <td>
                                    <input type="text" size={30} className="input-sm" ref={subjectRef} value={subject} onChange={(e) => setSubject(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th width="15%" className="text-center">내용</th>
                                <td>
                                    <textarea cols={50} rows={7} ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th width="15%" className="text-center">비밀번호</th>
                                <td>
                                    <input type="password" size={15} className="input-sm" ref={pwdRef} value={pwd} onChange={(e) => setPwd(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="text-center">
                                    <button className="btn btn-sm btn-primary" onClick={boardInsertBtn}>작성</button>&nbsp;
                                    <button className="btn btn-sm btn-outline-primary" onClick={() => nav("/board/list")}>취소</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}