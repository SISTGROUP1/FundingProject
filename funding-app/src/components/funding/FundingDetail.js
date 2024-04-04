import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom"
import apiClient from "../../http-commons"
import { Fragment, useState } from "react"

export const FundingDetail = () => {
    const { fno } = useParams()
    const [curpage, setCurpage] = useState(1)
    const userId = window.sessionStorage.getItem('id')
    console.log(userId)
    const { isLoading, isError, error, data } = useQuery(
        ['funding-detail', curpage, fno],
        async () => {
            return await apiClient.get(`/funding/detail/${fno}/${curpage}`)
        }
    )
    if (isLoading) return <h1 className="text-center">Loading...</h1>
    if (isError) return <h1 className="text-center">{error.message}</h1>
    console.log(data)
    console.log(data.data.percent)

    const fundingForm = () => {
        if (window.sessionStorage.getItem('id') === null) {
            alert('로그인이 필요한 서비스입니다.')
        } else {
            window.location.href = "/funding/fund/" + data.data.data.fno
        }
    }

    const handleChange = (page) => {
        setCurpage(page)
    }

    let row=[]
    if(data.data.startBlockNum>1){
        row.push(<li class="page-item"><a class="page-link" href="#"><i class="ti-angle-double-left"></i></a></li>)
    }
    for(let i=data.data.startBlockNum;i<=data.data.endBlockNum;i++){
        if(curpage===i){
            row.push(<li class="page-item active"><a class="page-link" onClick={()=>handleChange(i)}>{i}</a></li>)
        }else{
            row.push(<li class="page-item"><a class="page-link" onClick={()=>handleChange(i)}>{i}</a></li>)
        }
    }
    if(data.data.endBlockNum<data.data.totalpage){
        row.push(<li class="page-item"><a class="page-link" href="#"><i class="ti-angle-double-right"></i></a></li>)
    }

    return (
        <section id="blog" className="section">
            <div className="container text-center">
                <div className="row text-left">
                    <table className="table">
                        <thead>
                            <tr>
                                <td rowSpan={6} width={"60%"}>
                                    <img src={data.data.slide[0]} style={{ "width": "100%" }} />
                                </td>
                                <td width={"40%"}>{data.data.data.title}</td>
                            </tr>
                            <tr>
                                <td width={"40%"}>{data.data.data.subtitle}</td>
                            </tr>
                            <tr>
                                <td width={"40%"}>후원건수 : {data.data.sPage}</td>
                            </tr>
                            <tr>
                                <td width={"40%"}>{data.data.data.funding}</td>
                            </tr>
                            <tr>
                                <td width={"40%"} className="text-right">
                                    <div class="progress mt-2 mb-3">
                                        <div class="progress-bar" role="progressbar" style={{ "width": data.data.percent+"%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"><span>90%</span></div>
                                    </div>
                                    {data.data.totalPay.toLocaleString()}원
                                    <span style={{"margin":"0px 15px"}}>{data.data.percent}% / 100%</span>
                                    <button className="btn btn-lg btn-primary" onClick={fundingForm}>펀딩</button>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width={"60%"}>
                                    {
                                        data.data.detail.map((detail) =>
                                            <img src={detail} style={{ "width": "100%" }} />
                                        )
                                    }
                                </td>
                                <td width={"40%"}>
                                    <table className="table">
                                        <tbody>
                                            {
                                                data.data.sList &&
                                                data.data.sList.map((s) =>
                                                    <Fragment>
                                                        <tr>
                                                            <td width={"20%"}>{s.name}</td>
                                                            <td width={"80%"}>{s.regdate}</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={2}>{s.pay.toLocaleString()}원</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={2}>
                                                                {s.msg}
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            }
                                            <tr>
                                                <td className="text-center" style={{"border":"none"}} colSpan={"2"}>
                                                    <ul class="pagination pagination-sm" style={{"display":"-webkit-inline-box"}}>
                                                        {row}
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}