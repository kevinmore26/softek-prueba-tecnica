import React from 'react';

const Modal: React.FC<{ isOpen: boolean; closeModal: () => void }> = ({
  isOpen,
  closeModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
   
      <div className="fixed inset-0 bg-black opacity-50"></div>
       
      <div className="bg-white rounded-lg shadow-lg relative z-10 w-full max-w-md p-6">
         
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-center w-full">Compra por este medio</h2>
          <button 
            onClick={closeModal} 
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        {/* Texto del Modal */}
        <p className="text-gray-700">
          Esta opción te permite comprar de manera segura y conveniente en línea. 
          Descubre las ventajas y comienza tu experiencia de compra en nuestra plataforma.
        </p>
      </div>
    </div>
  );
};

export default Modal;
