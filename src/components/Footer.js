import React from 'react';
import '../stylesheet/Footer.css'

const Footer = () => {
return (
  <footer className="footer">

    <div className="footer-top">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-info">
            <a href="/" className="logo d-flex align-items-center">
              <img src="logo.png" alt="logo"/>
              <span>Reado</span>
            </a>
            <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
            <div className="social-links mt-3">
              <a href="/" className="twitter"><i className="bi bi-twitter"></i></a>
              <a href="/" className="facebook"><i className="bi bi-facebook"></i></a>
              <a href="/" className="instagram"><i className="bi bi-instagram"></i></a>
              <a href="/" className="linkedin"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i className="bi bi-chevron-right"></i> <a href="/">Home</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="/">About us</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="/">Services</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="/">Terms of service</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="/">Privacy policy</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><i className="bi bi-chevron-right"></i> <a href="/">Rent a house</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="/">Book a meeting</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>
              A108 Adam Street <br/>
              New York, NY 535022<br/>
              United States <br/><br/>
              <strong>Phone:</strong> +1 5589 55488 55<br/>
              <strong>Email:</strong> info@example.com<br/>
            </p>

          </div>

        </div>
      </div>
    </div>

    <div className="container">
      <div className="copyright">
        &copy; Copyright <strong><span>Reado</span></strong>. All Rights Reserved
      </div>
      
    </div>
  </footer>
    );
};

export default Footer;