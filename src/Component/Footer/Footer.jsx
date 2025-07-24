import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import freshcartLogo from "../../assets/Images/freshcart-logo.svg";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <footer className="pt-8 pb-4 bg-white border-t border-gray-200">
      <div className="container ">
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-8">
          
          <div className="xl:col-span-2">
            <Link to={`/`}>
              <img src={freshcartLogo} alt="FreshCart Logo" className="w-38 pt-3" />
            </Link>
            <p>
              FreshCart is a versatile e-commerce platform offering a wide range
              of products, from clothing to electronics. It provides a
              user-friendly experience for seamless shopping across diverse
              categories.
            </p>
            <div className="social flex gap-4 mt-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.linkein.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <Link to="/">Men's Fashion</Link>
              </li>
              <li>
                <Link to="/">Women's Fashion</Link>
              </li>
              <li>
                <Link to="/">Baby & Toys</Link>
              </li>
              <li>
                <Link to="/">Beauty & Health</Link>
              </li>
              <li>
                <Link to="/">Electronics</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <Link to={`/`}>About Us</Link>
              </li>
              <li>
                <Link to={`/`}>Contact Us</Link>
              </li>
              <li>
                <Link to={`/`}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={`/`}>Terms of Service</Link>
              </li>
              <li>
                <Link to={`/`}>Shipping Policy</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <Link to="/">My Account</Link>
              </li>
              <li>
                <Link to="/">My Orders</Link>
              </li>
              <li>
                <Link to="/">Wishlist</Link>
              </li>
              <li>
                <Link to="/">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/">Help Center</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-full text-center w-full ">
            <div>
              {" "}
              <p className="text-gray-500 text-sm ">
                &copy; {new Date().getFullYear()} FreshCart. All rights
                reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Made with ❤️ by{" "}
                <a
                  href="https://www.facebook.com/mohamed.wael2013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Mohamed wael
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
