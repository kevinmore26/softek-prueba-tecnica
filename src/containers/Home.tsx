import React, { useEffect, useState } from "react";
import familyImage from "../assets/portada-login.png";
import "./Home.scss";
import Form from "../components/Form";
import Background from "../components/Background";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home: React.FC<{ openModal: () => void }> = ({ openModal }) => {
  useEffect(() => {
    localStorage.removeItem("userData");
    localStorage.removeItem("selectedPlan");
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

 

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (formData: any) => {
    console.log("Form data submitted:", formData);
  };
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header openModal={openModal} />{" "} 
      <main className="flex-grow flex items-center justify-center  ">
        <div className="flex justify-center items-center w-full">
          <Background />
          <div className="bg-transparent rounded-lg p-6 flex flex-col lg:flex-row max-w-6xl w-full">
            <div className="flex justify-center imagenfamilyoriginal">
              <img
                src={familyImage}
                alt="Familia feliz"
                className="rounded-lg familyimage"
              />
            </div>
            <div className="flex flex-col justify-center   homeform">
              <div className="padreimagenfamily">
                <div>
                  <h1 className="segurosaludflexible monserratregular text-xl font-bold mb-2 p-3">
                    Seguro Salud Flexible
                  </h1>
                  <h2 className="text-2xl monserratbold mb-4 text-gray-800">
                    Creado para ti y tu familia
                  </h2>
                </div>
                <div className="flex justify-center otraimagenfamily">
                  <img
                    src={familyImage}
                    alt="Familia feliz"
                    className="rounded-lg familyimage"
                  />
                </div>
              </div>
              <hr className="block md:hidden my-4 border-t border-gray-300" />
              <p className="monserratregular text-gray-600 mb-6 hide-for-mobile">
                Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe
                nuestra asesoría. 100% online.
              </p>
              <Form onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
