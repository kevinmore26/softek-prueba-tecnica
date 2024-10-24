import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import paraMiIcon from "../assets/IcProtectionLight.svg";
import paraAlguienIcon from "../assets/IcAddUserLight.svg";
import homeImage from "../assets/IcHomeLight.svg"; // Primera imagen
import hospitalImage from "../assets/IcHospitalLight.svg"; // Segunda imagen
import checkIcon from "../assets/check.svg";
import { getPlansData } from "../services/api";
import "./QuoteSelection.scss";

const PlanSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Función para capturar el plan seleccionado y almacenarlo en localStorage
  const handleSelectPlan = (plan: {
    name: string;
    price: number;
    finalPrice: number;
  }) => {
    const selectedPlanData = {
      name: plan.name,
      price: plan.price,
      finalPrice: plan.finalPrice,
    };
    localStorage.setItem("selectedPlan", JSON.stringify(selectedPlanData)); // Guardar el plan en localStorage
    console.log("Plan seleccionado guardado:", selectedPlanData);

    navigate("/summary"); // Redirigir a la pantalla de resumen después de seleccionar el plan
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (!storedUser) {
      navigate("/");
    }
  }, []);

  const handleSelectOption = async (option: string) => {
    setSelectedOption(option);
    setLoading(true);

    setTimeout(async () => {
      const plansData = await getPlansData();
      let filteredPlans = plansData.list.slice(0, 3); // Filtramos solo 3 planes

      // Aplicar descuento del 5% si la opción seleccionada es "paraAlguien"
      if (option === "paraAlguien") {
        filteredPlans = filteredPlans.map((plan: any) => ({
          ...plan,
          finalPrice: plan.price * 0.95, // Aplica el 5% de descuento
        }));
      } else {
        filteredPlans = filteredPlans.map((plan: any) => ({
          ...plan,
          finalPrice: plan.price, // Sin descuento
        }));
      }

      setPlans(filteredPlans);
      setLoading(false); // Finaliza el skeleton
    }, 1000);
  };

  const nextPage = () => {
    if (currentPage < plans.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 px-4 padrequote">
      <div className="anchoroot">
        {/* Botón Volver */}
        <button
          onClick={handleGoBack}
          className="flex items-center mobilebr text-blue-600 font-semibold mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M15.53 4.47a.75.75 0 010 1.06L10.56 10.5h8.69a.75.75 0 010 1.5H10.56l4.97 4.97a.75.75 0 11-1.06 1.06l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 011.06 0z"
              clipRule="evenodd"
            />
          </svg>
          Volver
        </button>

        <h1 className="md:text-4xl font-bold text-left mb-4 md:text-center text-2xl">
          Rocío ¿Para quién deseas <br className="mobilebr" /> cotizar?
        </h1>
        <p className="text-gray-600 text-left mb-8 md:text-center">
          Selecciona la opción que se ajuste más a tus necesidades.
        </p>

        <div className="flex flex-col sm:flex-row sm:gap-6 gap-4 justify-center w-full sm:w-auto">
          {/* Opción "Para mí" */}
          <div
            onClick={() => handleSelectOption("paraMi")}
            className={`relative w-full sm:w-60 seccionesseleccion p-4 rounded-xl flex flex-col items-left cursor-pointer transition-all duration-300 ${
              selectedOption === "paraMi"
                ? "border-black border-4"
                : "border-gray-300 border-2"
            }`}
          >
            <img src={paraMiIcon} alt="Para mí" className="w-12 mb-3" />
            <h3 className="font-bold mb-2 text-left texttitulo text-xl">
              Para mí
            </h3>
            <p className="text-sm text-gray-600 text-left">
              Cotiza tu seguro de salud y agrega familiares si así lo deseas.
            </p>
            {selectedOption === "paraMi" && (
              <div className="absolute top-2 right-2 w-5 h-5 botoncheck text-white rounded-full flex items-center justify-center">
                <img
                  src={checkIcon}
                  alt="Seleccionado"
                  className="text-green bg-green"
                />
              </div>
            )}
          </div>

          {/* Opción "Para alguien más" */}
          <div
            onClick={() => handleSelectOption("paraAlguien")}
            className={`relative w-full sm:w-60 seccionesseleccion p-4 rounded-xl flex flex-col items-left cursor-pointer transition-all duration-300 ${
              selectedOption === "paraAlguien"
                ? "border-black border-4"
                : "border-gray-300 border-2"
            }`}
          >
            <img
              src={paraAlguienIcon}
              alt="Para alguien más"
              className="w-12 mb-3"
            />
            <h3 className="font-bold text-xl mb-2 text-left texttitulo">
              Para alguien más
            </h3>
            <p className="text-sm text-gray-600 text-left">
              Realiza una cotización para uno de tus familiares o cualquier
              persona.
            </p>
            {selectedOption === "paraAlguien" && (
              <div className="absolute top-2 right-2 w-5 h-5 botoncheck text-white rounded-full flex items-center justify-center">
                <img
                  src={checkIcon}
                  alt="Seleccionado"
                  className="text-green bg-green "
                />
              </div>
            )}
          </div>
        </div>

        {/* Skeleton o planes */}
        <div className="my-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Skeleton loading cards estilizados */}
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="skeleton-card bg-gray-200 rounded-lg p-4 animate-pulse"
                  style={{ height: "350px" }}
                >
                  <div className="skeleton-image bg-gray-300 w-12 h-12 mb-8 rounded"></div>
                  <div className="skeleton-title bg-gray-300 h-6 w-3/4 mb-6 rounded"></div>
                  <div className="skeleton-text bg-gray-300 h-4 w-full mb-4 rounded"></div>
                  <div className="skeleton-text bg-gray-300 h-4 w-2/3 mb-6 rounded"></div>
                  <div className="skeleton-button bg-gray-300 h-10 w-1/2 rounded mt-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Versión Desktop */}
              <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                  <div
                    key={plan.name}
                    className="planesbox bg-white rounded-lg shadow-md relative p-4 flex flex-col justify-between h-full"
                  >
                    <div className="flex flex-col flex-grow">
                      {index === 1 && (
                        <div className="inline-block bg-green-100 text-green-700 font-bold text-xs px-2 py-1 rounded-full mb-2 planrecomendadotext">
                          Plan recomendado
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <img
                          src={index % 2 === 0 ? homeImage : hospitalImage}
                          alt="Plan icon"
                          className="w-12 h-12"
                        />
                      </div>

                      <p className="text-gray-700 font-semibold">
                        Costo del plan
                      </p>
                      {selectedOption === "paraAlguien" && (
                        <p className="line-through text-gray-400">
                          ${plans[index]?.price} antes
                        </p>
                      )}
                      <p className="text-xl font-bold text-black">
                        ${plan.finalPrice} al mes
                      </p>
                      <hr className="border-t-2 border-gray-300 my-5" />
                      <ul className="list-disc ml-5">
                        {plan.description.map((desc: string, index: number) => (
                          <li key={index} className="text-black my-5">
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectPlan(plan)}
                      className="mt-4 bg-red-500 btnplan w-full text-white py-2 px-4 rounded-full hover:bg-red-500 transition-all"
                    >
                      Seleccionar Plan
                    </button>
                  </div>
                ))}
              </div>

              {/* Versión Mobile */}
              {plans.length > 0 && (
                <div className="sm:hidden flex flex-col items-center">
                  <div className="flex items-center justify-between">
                    <div className="p-10 bg-white rounded-lg shadow-md w-full max-w-md">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">
                          {plans[currentPage]?.name}
                        </h3>
                        <img
                          src={
                            currentPage % 2 === 0 ? homeImage : hospitalImage
                          }
                          alt="Plan icon"
                          className="w-12 h-12"
                        />
                      </div>
                      {currentPage === 1 && (
                        <div className="inline-block bg-green-100 text-green-700 font-bold text-xs px-2 py-1 rounded-full mb-2">
                          Plan recomendado
                        </div>
                      )}
                      <p className="text-gray-700 font-semibold">
                        Costo del plan
                      </p>
                      {selectedOption === "paraAlguien" && (
                        <p className="line-through text-gray-400">
                          ${plans[currentPage]?.price} antes
                        </p>
                      )}

                      <p className="text-xl font-bold text-black">
                        ${plans[currentPage]?.finalPrice} al mes
                      </p>
                      <hr className="border-t-2 border-gray-300 my-5" />
                      <ul className="list-disc ml-5">
                        {plans[currentPage]?.description.map(
                          (desc: string, index: number) => (
                            <li key={index} className="text-black my-5">
                              {desc}
                            </li>
                          )
                        )}
                      </ul>
                      <button
                        onClick={() => handleSelectPlan(plans[currentPage])}
                        className="mt-4 bg-red-500 btnplan w-full text-white py-2 px-4 rounded-full hover:bg-red-500 transition-all"
                      >
                        Seleccionar Plan
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center mt-4">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 0}
                      className="p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-gray-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.53 4.47a.75.75 0 010 1.06L10.56 10.5h8.69a.75.75 0 010 1.5H10.56l4.97 4.97a.75.75 0 11-1.06 1.06l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 011.06 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <p className="text-gray-600">
                      {currentPage + 1} / {plans.length}
                    </p>
                    <button
                      onClick={nextPage}
                      disabled={currentPage === plans.length - 1}
                      className="p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-gray-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.47 19.53a.75.75 0 010-1.06L13.44 13.5H4.75a.75.75 0 010-1.5h8.69l-4.97-4.97a.75.75 0 111.06-1.06l6.25 6.25a.75.75 0 010 1.06l-6.25 6.25a.75.75 0 01-1.06 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;
