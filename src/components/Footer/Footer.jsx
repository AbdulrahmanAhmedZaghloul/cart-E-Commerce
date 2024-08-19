import React from "react";
import logo from "../../assets/images/logo.svg";

export default function Footer() {
  return (
    <React.Fragment>
      <section className="footer bg-[#f8f8f8]">
        <div className="footer-row">
          <div className="footer-col">
            <h4>Info</h4>
            <ul className="links">
              <li>
                About Us</li>
              <li>Compressions</li>
              <li>Customers</li>
              <li>Service</li>
              <li>Collection</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul className="links">
              <li>Free Designs</li>
              <li>Latest Designs</li>
              <li>Themes</li>
              <li>Popular Designs</li>
              <li>Art Skills</li>
              <li>New Uploads</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="links">
              <li>Customer Agreement</li>
              <li>Privacy Policy</li>
              <li>GDPR</li>
              <li>Security</li>
              <li>Testimonials</li>
              <li>Media Kit</li>
            </ul>
          </div>
          <div className="footer-col">
            <img src={logo} alt="logo" className="text-center mx-auto" />      <p>
              Subscribe to our newsletter for a weekly dose
              of news, updates, helpful tips, and
              exclusive offers.
            </p>

          </div>
        </div>
      </section>

    </React.Fragment>
  );
}
