import { useMutation } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import apiClient from "../../http-commons"
import { useRef, useState } from "react"

export const BoardDelete = () => {
    const { no } = useParams()
    const nav = useNavigate()
    const [pwd, setPwd] = useState('')
    const pwdRef = useRef(null)
    const { mutate: boardDelete } = useMutation(
        ['board-delete', no],
        async () => {
            return await apiClient.delete(`/board/delete/${no}/${pwd}`)
        }, {
            onSuccess: (response) => {
                if(response.data==='YES'){ 
                    window.location.href='/board/list'
                }else if(response.data==='NO'){
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

    const boardDeleteBtn=()=>{
        if(pwd.trim()===''){
            pwdRef.current.focus()
            return
        }
        boardDelete()
    }

    return (
        <section id="blog" className="section">
            <div className="container text-center">
                <div className="row text-left">
                    <h3 style={{ "margin": "15px 0" }}>게시물 삭제</h3>
                    <table className="table">
                        <tr>
                            <td className="text-center">
                                비밀번호 : <input type="password" size={15} className="input-sm" ref={pwdRef} value={pwd} onChange={(e) => setPwd(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">
                                <button className="btn btn-sm btn-primary" onClick={boardDeleteBtn}>삭제</button>&nbsp;
                                <button className="btn btn-sm btn-outline-primary" onClick={() => nav(-1)}>취소</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </section>
    )
}