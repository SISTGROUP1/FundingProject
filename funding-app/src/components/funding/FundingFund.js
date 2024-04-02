import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import apiClient from "../../http-commons"

export const FundingFund = () => {
    const { fno } = useParams()
    const nav = useNavigate()
    const { isLoading, isError, error, data } = useQuery(
        ['funding-fund', fno],
        async () => {
            return await apiClient.get(`/funding/detail/${fno}`)
        }
    )
    if (isLoading) return <h1 className="text-center">Loading...</h1>
    if (isError) return <h1 className="text-center">{error.message}</h1>
    console.log(data)

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
                                    <input type="text" className="input-sm" size={30} />
                                </td>
                            </tr>
                            <tr>
                                <th className="text-center" width="15%">메시지</th>
                                <td>
                                    <textarea cols={50} rows={5}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="text-center">
                                    <button className="btn btn-sm btn-primary">펀딩</button>&nbsp;
                                    <button className="btn btn-sm" onClick={() => nav(-1)}>취소</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}