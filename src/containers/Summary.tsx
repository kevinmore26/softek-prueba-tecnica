import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Summary from "../components/SummaryComponent"; // Importamos el componente de presentación
import { getUserData } from "../services/api"; // Obtenemos solo los datos del usuario
import Stepper from "../components/Stepper";
import Header from "../components/Header";
const SummaryContainer: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    lastName: string;
    dni: string;
    cellphone: string;
  } | null>(null);

  const [infoLogin, setInfoLogin] = useState<{
    documentNumber: string;
    phoneNumber: string;
  } | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    finalPrice: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos del usuario de la API
        const userData = await getUserData();
        setUser(userData);

        const storedPlan = localStorage.getItem("selectedPlan");
        if (storedPlan) {
          setSelectedPlan(JSON.parse(storedPlan));
        } else {
          navigate("/plans");
          console.error("No hay ningún plan seleccionado en el localStorage.");
        }

        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
          setInfoLogin(JSON.parse(storedUser));
        } else {
          navigate("/");
          console.error(
            "No se encontraron datos del login en el localStorage."
          );
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Regresa a la pantalla anterior
  };

  if (loading) {
    return <div>Cargando...</div>;
  }
  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <Header openModal={openModal} />{" "}
      <div className="sticky top-0 z-10 bg-white">
        <Stepper currentStep={2} totalSteps={2} />
      </div>
      <div className="flex flex-col items-center justify-center my-8 px-4 padrequote">
        <div className="anchoroot">
          <button
            onClick={handleGoBack}
            className="flex items-center mobilebr text-blue-600 font-semibold mb-6"
          >
            <span className="rounded-full border border-blue-600 p-1 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3"
              >
                <path
                  fillRule="evenodd"
                  d="M15.53 4.47a.75.75 0 010 1.06L10.56 10.5h8.69a.75.75 0 010 1.5H10.56l4.97 4.97a.75.75 0 11-1.06 1.06l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="ml-2">Volver</span>
          </button>

          <h1 className="text-4xl font-bold text-left mb-4">
            Resumen de tu seguro
          </h1>

          <div className="w-full">
            {user && selectedPlan && infoLogin && (
              <Summary
                user={{
                  name: user.name,
                  dni: infoLogin.documentNumber,
                  cellphone: infoLogin.phoneNumber,
                  lastName: user.lastName,
                }}
                selectedPlan={selectedPlan}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryContainer;
