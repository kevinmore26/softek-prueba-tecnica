import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Plans from "./containers/Plans";
import Summary from "./containers/Summary";
import "./styles/main.scss"; // Importa los estilos globales 
import Modal from "./components/ModalComprar"; // Importa tu componente Modal
// Aquí incialmente pude usar el header para que sea un componente y que no tenga que poner componente por componente, pero me malogra el diseño en general, el flujo por eso lo puse por separado
const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home openModal={openModal} />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </main>

        <Modal isOpen={isModalOpen} closeModal={closeModal} />
      </div>
    </Router>
  );
};

export default App;
