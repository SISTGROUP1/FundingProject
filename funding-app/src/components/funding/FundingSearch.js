import { useRef, useState } from "react"
import { useQuery } from "react-query"
import apiClient from "../../http-commons"
import { Link } from "react-router-dom"
import Pagination from "react-js-pagination"

export const FundingSearch = () => {
    const [curpage, setCurpage] = useState(1)
    const [fd, setFd] = useState('경찰')
    const fdRef = useRef(null)
    const { isLoading, isError, error, data, refetch: searchData } = useQuery(
        ['funding-search', curpage],
        async () => {
            return await apiClient.get(`/funding/find/${curpage}/${fd}`)
        }
    )
    if (isLoading) return <h1 className="text-center">Loading...</h1>
    if (isError) return <h1 className="text-center">{error.message}</h1>
    console.log(data)

    const searchBtn = () => {
        if (fd.trim() === '') {
            fdRef.current.focus()
            return
        }
        searchData()
    }
    const handleChange = (page) => {
        setCurpage(page)
    }

    return (
        <section id="blog" className="section">
            <div className="container text-center">
                <div className="row text-left">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>
                                    <input type="text" className="input-sm" size={20} ref={fdRef} value={fd} onChange={(e) => setFd(e.target.value)} />&nbsp;
                                    <button className="btn btn-sm btn-primary" onClick={searchBtn}>검색</button>
                                </td>
                            </tr>
                        </thead>
                    </table>
                    {
                        data.data.fList &&
                        data.data.fList.map((funding) =>
                            <div className="col-md-3">
                                <div className="card border mb-4">
                                    <Link to={"/funding/detail/" + funding.fno}>
                                        <img src={funding.img} alt="" className="card-img-top w-100" />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <Link to={"/funding/detail/" + funding.fno} style={{ "color": "#495057" }}>{funding.title}</Link>
                                        </h5>
                                        <div className="post-details">
                                            <a href="javascript:void(0)">{funding.corp}</a>
                                        </div>
                                        <a className="btn btn-xs">{funding.funding}</a>&nbsp;
                                        <a className="btn btn-xs">{funding.regdate}</a>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div style={{ "height": "10px" }}></div>
            <div className="container text-center">
                <div className="text-center">
                    <Pagination
                        activePage={curpage}
                        itemsCountPerPage={20}
                        totalItemsCount={data.data.count}
                        pageRangeDisplayed={10}
                        prevPageText={"<"}
                        nextPageText={">"}
                        onChange={handleChange}
                        style={{ "width": "100%" }}
                    />
                </div>
            </div>
        </section>
    )
}