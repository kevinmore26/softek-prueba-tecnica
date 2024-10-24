import React, { useState } from "react";
import "./Form.scss";
import { useNavigate } from "react-router-dom";
import Modal from "./ModalTerminos";
interface FormProps {
  onSubmit: (formData: any) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentType, setDocumentType] = useState("DNI");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [commercialPolicy, setCommercialPolicy] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar el botón de carga

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Validación en tiempo real del DNI
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (documentType === "DNI") {
      if (/^\d{0,8}$/.test(value)) {
        setDocumentNumber(value);
        if (value.length < 8) {
          setError("El DNI debe tener 8 dígitos.");
        } else {
          setError("");
        }
      }
    } else if (documentType === "RUC") {
      if (/^\d{0,11}$/.test(value)) {
        setDocumentNumber(value);
        if (value.length < 11) {
          setError("El RUC debe tener 11 dígitos.");
        } else {
          setError("");
        }
      }
    }
  };
  const openModal = () => {
    setIsModalOpen(true); // Abre el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que las políticas hayan sido aceptadas
    if (!privacyPolicy || !commercialPolicy) {
      setError("Debes aceptar ambas políticas.");
      return;
    }

    // Validar celular
    const isPhoneValid = /^\d{9}$/.test(phoneNumber);
    const correctDNI = "30216147";

    if (!isPhoneValid) {
      setError("El número de celular no es válido.");
      return;
    }

    if (documentNumber !== correctDNI) {
      setError("El usuario no existe.");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulamos una espera para la "cotización"
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Guardamos los datos del usuario y redirigimos a los planes
    const userData = {
      documentNumber,
      phoneNumber,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    onSubmit(userData); // Llamamos a la función para guardar los datos
    setIsLoading(false); // Ocultar el botón de carga después de finalizar

    // Redirigir a la página de los planes
    navigate("/plans");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex border rounded-lg overflow-hidden">
        <select
          name="documentType"
          id="documentType"
          className="bg-white text-gray-700 p-4 border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-2/5"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        >
          <option value="DNI">DNI</option>
          <option value="RUC">RUC</option>
        </select>
        <input
          type="text"
          placeholder="Nro. de documento"
          value={documentNumber}
          onChange={handleDocumentChange}
          className="flex-1 monserratregular focus:outline-none focus:ring-2 p-4 focus:ring-black"
          required
        />
      </div>

      <div className="form__group">
        <input
          type="text"
          placeholder="Celular"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full border monserratregular border-black rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="privacyPolicy"
          className="flex items-center text-gray-700"
        >
          <input
            id="privacyPolicy"
            className="custom-checkbox h-5 w-5 focus:ring-black focus:ring-2 mr-2"
            type="checkbox"
            checked={privacyPolicy}
            onChange={() => setPrivacyPolicy(!privacyPolicy)}
          />
          <span className="monserratbasic">
            Acepto la Política de Privacidad
          </span>
        </label>

        <label className="flex items-center text-gray-700">
          <input
            type="checkbox"
            className="custom-checkbox h-5 w-5 focus:ring-black focus:ring-2 mr-2"
            checked={commercialPolicy}
            onChange={() => setCommercialPolicy(!commercialPolicy)}
          />
          <span className="monserratbasic">
            Acepto la Política Comunicaciones Comerciales
          </span>
        </label>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p
        className="text-sm monserratbasic underline cursor-pointer"
        onClick={openModal}
      >
        Aplican Términos y Condiciones.
      </p>

      <button
        type="submit"
        className={`cotizaaqui ${
          isLoading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-black hover:border-black text-white font-bold hover:bg-white hover:text-black"
        } rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-white-500`}
        disabled={isLoading} // Desactivar el botón mientras carga
      >
        {isLoading ? (
          <span className="flex justify-center items-center border-t-white">
            <span className="inline-block w-4 h-4 border-2 border-t-2 border-t-white hover:border-gray-200 border-gray-200 rounded-full animate-spin mr-2"></span>
            Cotizando...
          </span>
        ) : (
          "Cotiza aquí"
        )}
      </button>
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </form>
  );
};

export default Form;
