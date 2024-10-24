import React, { useState, useEffect } from "react";

interface SummaryProps {
  user: {
    name: string;
    dni: string;
    cellphone: string;
    lastName: string;
  };
  selectedPlan: {
    name: string;
    finalPrice: number;
  };
}

const Summary: React.FC<SummaryProps> = ({ user, selectedPlan }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos un retraso de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Mostrar skeleton -  se que debería usar un lazyloading o useMemo, estoy simulando en este caso porque son muy pocos datos
    return (
      <div className="summary sombrabox bg-white shadow-md rounded-lg p-6 w-full">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
          <hr className="my-4 border-gray-300" />
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
        </div>
      </div>
    );
  }

  // Mostrar contenido real después de la carga
  return (
    <div className="summary sombrabox bg-white shadow-md rounded-lg p-6 w-full">
      <div>
        <h2 className="text-lg monserratbasic mb-4">
          Precios calculados para:
        </h2>

        <div className="mb-4">
          <p className="font-bold text-gray-700 text-xl">
            <i className="fas fa-user"></i> {user.name} {user.lastName}
          </p>
          <hr className="my-4" />
          <p className="font-bold text-gray-700">Responsable de pago</p>
          <p className="text-gray-600">DNI: {user.dni}</p>
          <p className="text-gray-600">Celular: {user.cellphone}</p>
        </div>

        <div>
          <p className="font-bold text-gray-700">Plan elegido</p>
          <p className="text-gray-600">{selectedPlan.name}</p>
          <p className="text-gray-600">
            Costo del Plan: ${selectedPlan.finalPrice} al mes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
