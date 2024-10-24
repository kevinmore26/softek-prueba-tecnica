import React, { useEffect, useState } from "react";
import { getPlansData } from "../services/api";
import Stepper from "../components/Stepper";
import QuoteSelection from "../components/QuoteSelection";
import Header from "../components/Header";
interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getPlansData().then((data) => setPlans(data.list));
  }, []);

  return (
    <div className="plans">
      <Header openModal={openModal} />{" "}
      <div className="sticky top-0 z-10 bg-white">
        <Stepper currentStep={1} totalSteps={2} />
      </div>
      <QuoteSelection></QuoteSelection>
    </div>
  );
};

export default Plans;
