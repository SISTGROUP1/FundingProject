import { Link } from "react-router-dom"

export const BoardList = () => {

    const boardInsertForm = () => {
        if (window.sessionStorage.getItem('id') === null) {
            alert('로그인이 필요한 서비스입니다.')
        } else {
            window.location.href = "/board/insert"
        }
    }

    return (
        <section id="blog" className="section">
            <div className="container text-center">
                <div className="row text-left">
                    <h3 style={{"margin":"15px 0"}}>자유게시판</h3>
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
                            <tr>
                                <td className="text-center" width="10%">번호</td>
                                <td width="45%">
                                    <Link to={"/board/detail/1"}>제목</Link>
                                </td>
                                <td className="text-center" width="15%">이름</td>
                                <td className="text-center" width="20%">작성일</td>
                                <td className="text-center" width="10%">조회수</td>
                            </tr>
                            <tr>
                                <td className="text-center" width="10%">번호</td>
                                <td width="45%">제목</td>
                                <td className="text-center" width="15%">이름</td>
                                <td className="text-center" width="20%">작성일</td>
                                <td className="text-center" width="10%">조회수</td>
                            </tr>
                            <tr>
                                <td className="text-center" width="10%">번호</td>
                                <td width="45%">제목</td>
                                <td className="text-center" width="15%">이름</td>
                                <td className="text-center" width="20%">작성일</td>
                                <td className="text-center" width="10%">조회수</td>
                            </tr>
                            <tr>
                                <td className="text-center" width="10%">번호</td>
                                <td width="45%">제목</td>
                                <td className="text-center" width="15%">이름</td>
                                <td className="text-center" width="20%">작성일</td>
                                <td className="text-center" width="10%">조회수</td>
                            </tr>
                            <tr>
                                <td className="text-center" width="10%">번호</td>
                                <td width="45%">제목</td>
                                <td className="text-center" width="15%">이름</td>
                                <td className="text-center" width="20%">작성일</td>
                                <td className="text-center" width="10%">조회수</td>
                            </tr>
                            <tr>
                                <td className="text-center" width="10%">번호</td>
                                <td width="45%">제목</td>
                                <td className="text-center" width="15%">이름</td>
                                <td className="text-center" width="20%">작성일</td>
                                <td className="text-center" width="10%">조회수</td>
                            </tr>
                            <tr>
                                <td className="text-center" width="10%">번호</td>
                                <td width="45%">제목</td>
                                <td className="text-center" width="15%">이름</td>
                                <td className="text-center" width="20%">작성일</td>
                                <td className="text-center" width="10%">조회수</td>
                            </tr>
                            <tr>
                                <td className="text-center" width="10%">번호</td>
                                <td width="45%">제목</td>
                                <td className="text-center" width="15%">이름</td>
                                <td className="text-center" width="20%">작성일</td>
                                <td className="text-center" width="10%">조회수</td>
                            </tr>
                            <tr>
                                <td className="text-center" width="10%">번호</td>
                                <td width="45%">제목</td>
                                <td className="text-center" width="15%">이름</td>
                                <td className="text-center" width="20%">작성일</td>
                                <td className="text-center" width="10%">조회수</td>
                            </tr>
                            <tr>
                                <td className="text-center" width="10%">번호</td>
                                <td width="45%">제목</td>
                                <td className="text-center" width="15%">이름</td>
                                <td className="text-center" width="20%">작성일</td>
                                <td className="text-center" width="10%">조회수</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5} className="text-center">
                                    페이징
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
    )
}