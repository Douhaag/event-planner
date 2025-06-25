
import React from 'react';
import '../styles/ConfirmModal.css';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="btn btn-confirm" onClick={onConfirm}>Yes</button>
          <button className="btn btn-cancel" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
