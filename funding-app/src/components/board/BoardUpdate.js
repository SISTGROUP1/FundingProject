import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import apiClient from "../../http-commons"
import { useRef, useState } from "react"

export const BoardUpdate = () => {
    const { no } = useParams()
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [pwd, setPwd] = useState('')
    const subjectRef = useRef(null)
    const contentRef = useRef(null)
    const pwdRef = useRef(null)
    const nav = useNavigate()
    
    const { isLoading, isError, error, data } = useQuery(
        ['board-update', no],
        async () => {
            return await apiClient.get(`/board/updateData/${no}`)
        },{
            onSuccess:(response)=>{
                setSubject(response.data.subject)
                setContent(response.data.content)
            }
        },{
            onError:(error)=>{
                console.log(error.response)
            }
        }
    )

    const {mutate:boardUpdate}=useMutation(
        async()=>{
            return await apiClient.put(`/board/update/${no}`,{
                name:window.sessionStorage.getItem('id'),
                subject:subject,
                content:content,
                pwd:pwd
            })
        },{
            onSuccess:(response)=>{
                if(response.data==='YES'){
                    window.location.href='/board/detail/'+no
                }else if(response.data==='NO'){
                    alert('비밀번호가 일치하지 않습니다.')
                    setPwd('')
                    pwdRef.current.focus()
                }
            }
        },{
            onError:(error)=>{
                console.log(error.response)
            }
        }
    )

    if (isLoading) return <h1 className="text-center">Loading...</h1>
    if (isError) return <h1 className="text-center">{error.message}</h1>
    console.log(data)

    const boardUpdateBtn = () => {
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
        boardUpdate()
    }

    return (
        <section id="blog" className="section">
            <div className="container text-center">
                <div className="row text-left">
                    <h3 style={{ "margin": "15px 0" }}>게시물 수정</h3>
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
                                    <button className="btn btn-sm btn-primary" onClick={boardUpdateBtn}>수정</button>&nbsp;
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