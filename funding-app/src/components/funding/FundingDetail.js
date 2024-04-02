import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom"
import apiClient from "../../http-commons"

export const FundingDetail = () => {
    const { fno } = useParams()

    const { isLoading, isError, error, data } = useQuery(
        ['funding-detail', fno],
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
                        <thead>
                            <tr>
                                <td rowSpan={5} width={"60%"}>
                                    <img src={data.data.slide[0]} style={{ "width": "100%" }} />
                                </td>
                                <td width={"40%"}>{data.data.data.title}</td>
                            </tr>
                            <tr>
                                <td width={"40%"}>{data.data.data.subtitle}</td>
                            </tr>
                            <tr>
                                <td width={"40%"}>인원수</td>
                            </tr>
                            <tr>
                                <td width={"40%"}>{data.data.data.funding}</td>
                            </tr>
                            <tr>
                                <td width={"40%"} className="text-right">
                                    <Link className="btn btn-lg btn-primary" to={"/funding/fund/"+data.data.data.fno}>펀딩</Link>
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
                                    그 외
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}