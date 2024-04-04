import { useQuery } from "react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import apiClient from "../../http-commons"
import { Fragment } from "react"

export const BoardDetail = () => {
    const { no } = useParams()
    const nav = useNavigate()
    const { isLoading, isError, error, data } = useQuery(
        ['board-detail', no],
        async () => {
            return await apiClient.get(`/board/detail/${no}`)
        }
    )
    if (isLoading) return <h1 className="text-center">Loading...</h1>
    if (isError) return <h1 className="text-center">{error.message}</h1>
    console.log(data)

    return (
        <section id="blog" className="section">
            <div style={{"paddingTop":"30px"}}></div>
            <div className="container text-center">
                <div className="row text-left">
                    <table className="table" style={{"border":"1px solid #dee2e6"}}>
                        <tbody>
                            <tr>
                                <td>
                                    <h3>{data.data.subject}</h3>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-right" style={{"border":"none","padding":"0px 12px 0px 0px"}}>
                                    {data.data.name}&nbsp;
                                </td>
                            </tr>
                            <tr>
                                <td className="text-right" style={{"border":"none","color":"#979797","padding":"0px 12px 0px 0px"}}>
                                    {data.data.regdate}&nbsp;
                                    조회수 {data.data.hit}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <pre style={{"border":"none","backgroundColor":"white"}}>{data.data.content}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-right">
                                    {
                                        data.data.name === window.sessionStorage.getItem('id') && (
                                            <Fragment>
                                                <Link className="btn btn-info btn-sm" to={"/board/update/" + data.data.no}>수정</Link>&nbsp;
                                                <Link className="btn btn-danger btn-sm" to={"/board/delete/" + data.data.no}>삭제</Link>&nbsp;
                                            </Fragment>
                                        )
                                    }
                                    <button className="btn btn-primary btn-sm" onClick={() => nav("/board/list")}>목록</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section >
    )
}
export default BoardDetail