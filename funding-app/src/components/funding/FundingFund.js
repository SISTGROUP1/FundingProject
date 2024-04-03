import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import apiClient from "../../http-commons"
import { useRef, useState } from "react"

export const FundingFund = () => {
    const { fno } = useParams()
    const nav = useNavigate()
    const [pay, setPay] = useState('')
    const [msg, setMsg] = useState('')
    const payRef = useRef(null)
    const msgRef = useRef(null)

    const { isLoading, isError, error, data } = useQuery(
        ['funding-fund', fno],
        async () => {
            return await apiClient.get(`/funding/detail/${fno}/1`)
        }
    )

    const {mutate:fundInsert}=useMutation(
        async()=>{
            return await apiClient.post(`/sponsor/insert/${fno}`,{
                name:window.sessionStorage.getItem('id'),
                pay:pay,
                msg:msg
            })
        },{
            onSuccess:(response)=>{
                if(response.data.msg==='YES'){
                    window.location.href='/funding/detail/'+fno
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
    
    const fund=()=>{
        if(pay.trim()===''){
            payRef.current.focus()
            return
        }
        if(msg.trim()===''){
            msgRef.current.focus()
            return
        }
        fundInsert()
    }

    return (
        <section id="blog" className="section">
            <div className="container text-center">
                <div className="row text-left">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th className="text-center" width="15%">상품명</th>
                                <td>{data.data.data.title}</td>
                            </tr>
                            <tr>
                                <th className="text-center" width="15%">금액</th>
                                <td>
                                    <input type="text" className="input-sm" size={30} ref={payRef} value={pay} onChange={(e) => setPay(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th className="text-center" width="15%">메시지</th>
                                <td>
                                    <textarea cols={50} rows={5} ref={msgRef} value={msg} onChange={(e) => setMsg(e.target.value)}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="text-center">
                                    <button className="btn btn-sm btn-primary" onClick={fund}>펀딩</button>&nbsp;
                                    <button className="btn btn-sm btn-outline-primary" onClick={() => nav(-1)}>취소</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}