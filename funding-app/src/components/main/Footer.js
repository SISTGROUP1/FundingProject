export const Footer = () => {
    return (
        <footer className="page-footer">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-sm-6">
                        <p>Copyright <script>document.write(new Date().getFullYear())</script> &copy; <a href="http://www.devcrud.com" target="_blank">DevCRUD</a></p>
                    </div>
                    <div className="col-sm-6">
                        <div className="socials">
                            <a className="social-item" href="javascript:void(0)"><i className="ti-facebook"></i></a>
                            <a className="social-item" href="javascript:void(0)"><i className="ti-google"></i></a>
                            <a className="social-item" href="javascript:void(0)"><i className="ti-github"></i></a>
                            <a className="social-item" href="javascript:void(0)"><i className="ti-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}