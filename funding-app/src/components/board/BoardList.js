import { useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import apiClient from "../../http-commons"

export const BoardList = () => {
    const [curpage, setCurpage] = useState(1)
    const { isLoading, isError, error, data } = useQuery(
        ['board-list', curpage],
        async () => {
            return await apiClient.get(`/board/list/${curpage}`)
        }
    )
    if (isLoading) return <h1 className="text-center">Loading...</h1>
    if (isError) return <h1 className="text-center">{error.message}</h1>
    console.log(data)

    const boardInsertForm = () => {
        if (window.sessionStorage.getItem('id') === null) {
            alert('로그인이 필요한 서비스입니다.')
        } else {
            window.location.href = "/board/insert"
        }
    }

    const handleChange = (page) => {
        setCurpage(page)
    }

    let row = []
    if (data.data.startBlockNum > 1) {
        row.push(<li class="page-item"><a class="page-link" href="#"><i class="ti-angle-double-left"></i></a></li>)
    }
    for (let i = data.data.startBlockNum; i <= data.data.endBlockNum; i++) {
        if (curpage === i) {
            row.push(<li class="page-item active"><a class="page-link" onClick={() => handleChange(i)}>{i}</a></li>)
        } else {
            row.push(<li class="page-item"><a class="page-link" onClick={() => handleChange(i)}>{i}</a></li>)
        }
    }
    if (data.data.endBlockNum < data.data.totalpage) {
        row.push(<li class="page-item"><a class="page-link" href="#"><i class="ti-angle-double-right"></i></a></li>)
    }

    return (
        <section id="blog" className="section">
            <div className="container text-center">
                <div className="row text-left">
                    <h3 style={{ "margin": "15px 0" }}>자유게시판</h3>
                    <h3>
                        <button className="btn btn-sm btn-primary" onClick={boardInsertForm}>새글</button>
                    </h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center" width="10%">번호</th>
                                <th className="text-center" width="45%">제목</th>
                                <th className="text-center" width="15%">이름</th>
                                <th className="text-center" width="20%">작성일</th>
                                <th className="text-center" width="10%">조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.data.bList &&
                                data.data.bList.map((board) =>
                                    <tr>
                                        <td className="text-center" width="10%">{board.no}</td>
                                        <td width="45%">{board.subject}</td>
                                        <td className="text-center" width="15%">{board.name}</td>
                                        <td className="text-center" width="20%">{board.regdate}</td>
                                        <td className="text-center" width="10%">{board.hit}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5} className="text-center">
                                    <ul class="pagination pagination-sm">
                                        {row}
                                    </ul>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
    )
}