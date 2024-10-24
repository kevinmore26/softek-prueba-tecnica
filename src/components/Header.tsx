import React from "react";
import logo from "../assets/logo.svg"; 
import './Header.scss'

const Header: React.FC<{ openModal: () => void }> = ({ openModal }) => {
  return (
    <header className="w-full bg-transparent  z-50 h-16">
      <div className="container mx-auto px-8 anchonavbar flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Rimac logo" className="w-20 select-none" />
        </div>
 
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="monserratregular tracking-[.2px] font-medium text-gray-700 hover:underline active:text-gray-900 hidden md:inline"
            onClick={openModal} // Llamamos a openModal para abrir el modal
          >
            ¡Compra por este medio!
          </button>
          <a
            href="tel:+0114116001"
            className="flex items-center gap-x-2 text-sm leading-5 hover:underline active:text-gray-900"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="phone"
              className="w-4 h-4 text-base"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
              ></path>
            </svg>
            <span className="font-bold tracking-[.4px]">(01) 411 6001</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
