import { Fragment, useState } from "react"
import { useQuery } from "react-query"
import apiClient from "../../http-commons"
import { Link } from "react-router-dom"
import { CookieUtil } from "../commons/CookieUtil"
import { useCookies } from "react-cookie"

export const Home = () => {
    const [cookies,setCookies]=useCookies('funding')
    const cookiesKeys=Object.keys(cookies)
    const cookiesValues=Object.values(cookies)
    console.log(cookies)
    const [curpage, setCurpage] = useState(1)
    const [fd, setFd] = useState('')
    const { isLoading, isError, error, data } = useQuery(
        ['funding-list', curpage],
        async () => {
            return await apiClient.get(`/${curpage}`)
        }
    )
    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>{error.message}</h1>
    console.log(data)

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
        <Fragment>
            <header id="home">
                <div className="container">
                    <div className="img-holder">
                        <img src="https://happybean-phinf.pstatic.net/20240219_28/1708334247978XRhI3_PNG/PC%25A9%25E1_2280x500_41c982.png" alt="" width={"100%"} style={{"paddingTop":"100px","backgroundColor":"green"}}/>
                    </div>
                </div>
            </header>

            {
                data.data &&
                <section id="blog" className="section">
                    <div className="container text-center">
                        {/* <h6 className="subtitle">My Blogs</h6>
                    <h6 className="section-title mb-4">Latest News</h6>
                    <p className="mb-5 pb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. In alias dignissimos. <br /> rerum commodi corrupti, temporibus non quam.</p> */}

                        <div className="row text-left">
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
                            <ul class="pagination pagination-sm" style={{"display":"-webkit-inline-box"}}>
                                {row}
                            </ul>
                        </div>
                    </div>
                    <div style={{"height":"20px"}}></div>
                    <div className="container text-center">
                        <div className="text-left">
                            {
                                cookies &&
                                cookiesKeys.map((key,index)=>
                                    <Link to={"/funding/detail/"+key.replace('funding','')}>
                                        <img src={cookiesValues[index]} style={{"width":"100px","height":"100px"}}/>&nbsp;
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </section>
            }
        </Fragment>
    )
}