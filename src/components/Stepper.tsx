import React from "react";
import { useNavigate } from "react-router-dom";
import "./Stepper.scss";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const   Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full containerstepper relative"> 
      {/* Desktop Stepper */}
      <div className="hidden md:flex items-center justify-between w-full containerstepperhijo">
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-full ${
              currentStep >= 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            1
          </div>
          <span
            className={`${
              currentStep >= 1
                ? "text-blue-600 monserratbasic"
                : "text-gray-500"
            }`}
          >
            Planes y coberturas
          </span>
        </div>
        <div className="text-gray-400">• • •</div>
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-full ${
              currentStep >= 2
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            2
          </div>
          <span
            className={`${
              currentStep >= 2
                ? "text-blue-600"
                : "text-gray-500 monserratbasic"
            }`}
          >
            Resumen
          </span>
        </div>
      </div>
      {/* Mobile Stepper */}
      <div className="md:hidden flex items-center justify-between w-full px-2 py-2">
        <button onClick={handleGoBack} className="bg-white border-2 border-blue-500 rounded-full text-blue-600 p-1.5 flex items-center justify-center w-8 h-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M15.53 4.47a.75.75 0 010 1.06L10.56 10.5h8.69a.75.75 0 010 1.5H10.56l4.97 4.97a.75.75 0 11-1.06 1.06l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 011.06 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="flex-1 flex items-center gap-2 text-sm font-bold mx-2">
          <span className="whitespace-nowrap monserratbasic">
            PASO {currentStep} DE {totalSteps}
          </span>
          <div className="w-full bg-gray-300 h-1 rounded-full">
            <div
              className="bg-blue-600 h-1 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
