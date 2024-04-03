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
            <div className="container text-center">
                <div className="row text-left">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <h3>{data.data.subject}</h3>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-right">
                                    {data.data.name}&nbsp;
                                    {data.data.regdate}&nbsp;
                                    조회수 {data.data.hit}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <pre>{data.data.content}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-right">
                                    {
                                        data.data.name === window.sessionStorage.getItem('id') && (
                                            <Fragment>
                                                <Link className="btn btn-info btn-sm">수정</Link>&nbsp;
                                                <Link className="btn btn-danger btn-sm">삭제</Link>&nbsp;
                                            </Fragment>
                                        )
                                    }
                                    <Link className="btn btn-primary btn-sm" onClick={() => nav(-1)}>목록</Link>
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