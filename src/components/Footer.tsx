import React from "react";
import rimacLogo from "../assets/logo-white.svg";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footerpadre">
      <footer className="bg-black text-white flex justify-between items-center  ">
        <div className="flex items-center">
          <img src={rimacLogo} alt="Rimac Logo" className="w-20 select-none" />
        </div>
        <div className="text-sm">© 2024 RIMAC Seguros y Reaseguros.</div>
      </footer>
    </div>
  );
};

export default Footer;
