import "./Footer.css"

function Footer() {
  return (
    <div className="container-fluid bg-light footer-con d-flex justify-content-center align-items-center px-0 py-5">
        <div className="row footer-wrapper">
            <div className="col-3 px-0">
                <div className="row">
                    <div className="col-12">
                        <p className="font-weight font-size">Social share</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex">
                        <a href="#">
                        <div className="socialMedia d-flex justify-content-center align-items-center text-white">
                        <i className="fa-brands fa-facebook-f font-size"></i>
                        </div>
                        </a>
                        <a href="#">
                        <div className="socialMedia ml-3 d-flex justify-content-center align-items-center text-white">
                        <i className="fa-brands fa-instagram font-size"></i>
                        </div>
                        </a>
                        <a href="#">
                        <div className="socialMedia ml-3 d-flex justify-content-center align-items-center text-white">
                        <i className="fa-brands fa-twitter font-size"></i>
                        </div>
                        </a>
                        <a href="#">
                        <div className="socialMedia ml-3 d-flex justify-content-center align-items-center text-white">
                        <i className="fa-brands fa-linkedin-in font-size"></i>
                        </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="col-3 d-flex flex-column links pl-4-5">
                <p className="font-size font-weight">Event info</p>
                <a href="#">Enter Now</a>
                <a href="#">Event Info</a>
                <a href="#">Course Maps</a>
                <a href="#">Race Pack</a>
                <a href="#">Results</a>
                <a href="#">FAQs</a>
                <a href="#">Am I Registered?</a>
            </div>
            <div className="col-3 d-flex flex-column links pl-5">
                <p className="font-size font-weight">Registration</p>
                <a href="#">Volunteers</a>
                <a href="#">Gallery</a>
                <a href="#">Press</a>
                <a href="#">Results</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Service Plus</a>
                <a href="#">Contacts</a>
            </div>
            <div className="col-3 d-flex flex-column links pl-5">
                <p className="font-size font-weight">Schedule</p>
                <a href="#">Gallery</a>
                <a href="#">About</a>
                <a href="#">Videos</a>
                <a href="#">Results</a>
                <a href="#">FAQs</a>
                <a href="#">Results</a>
                <a href="#">Volunteers</a>
            </div>
        </div>
    </div>
  )
}

export default Footer