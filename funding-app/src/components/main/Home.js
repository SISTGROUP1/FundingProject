import { Fragment, useState } from "react"
import { useQuery } from "react-query"
import apiClient from "../../http-commons"
import { Link } from "react-router-dom"
import Pagination from "react-js-pagination"

export const Home = () => {
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

    return (
        <Fragment>
            <header className="header" id="home">
                <div className="container">
                    <div className="infos">
                        <h6 className="subtitle">hello,I'm</h6>
                        <h6 className="title">James Smith</h6>
                        <p>UI/UX Designer</p>

                        <div className="buttons pt-3">
                            <button className="btn btn-primary rounded">HIRE ME</button>
                            <button className="btn btn-dark rounded">DOWNLOAD CV</button>
                        </div>

                        <div className="socials mt-4">
                            <a className="social-item" href="javascript:void(0)"><i className="ti-facebook"></i></a>
                            <a className="social-item" href="javascript:void(0)"><i className="ti-google"></i></a>
                            <a className="social-item" href="javascript:void(0)"><i className="ti-github"></i></a>
                            <a className="social-item" href="javascript:void(0)"><i className="ti-twitter"></i></a>
                        </div>
                    </div>
                    <div className="img-holder">
                        <img src="assets/imgs/man.svg" alt="" />
                    </div>
                </div>

                <div className="widget">
                    <div className="widget-item">
                        <h2>124</h2>
                        <p>Happy Clients</p>
                    </div>
                    <div className="widget-item">
                        <h2>456</h2>
                        <p>Project Completed</p>
                    </div>
                    <div className="widget-item">
                        <h2>789</h2>
                        <p>Awards Won</p>
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
            }
        </Fragment>
    )
}