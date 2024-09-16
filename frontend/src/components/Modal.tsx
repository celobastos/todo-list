import React from 'react';
import './Modal.css';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal-background">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
