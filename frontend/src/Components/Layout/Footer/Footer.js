import React from 'react';
import "./Footer.css";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div className="leftFooter">
          <h4>DOWNLOAD OUR APP</h4>
          <p>Download Our App for Android and IOS mobile phone</p>
          <img src={playStore} alt="playStore" />
          <img src={appStore} alt="appstore" />
        </div>
        <div className="midFooter">
          <h1>Kumo</h1>
          <p>High Quality is our first priority</p>
          <p>Copyrights 2023 &copy; Kumo</p>
        </div>
        <div className="rightFooter">
          <h4>Follow Us</h4>
            <Link to="/instagram">Instagram</Link>
            <Link to="/facebook">Facebook</Link>
            <Link to="/github">GitHub</Link>
        </div>
      </footer>
    </>
  )
}

export default Footer
