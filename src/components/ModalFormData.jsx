import React from 'react';
import { useSelector } from 'react-redux';

const ModalFormData = ({ onClose }) => {
  const { submittedData } = useSelector(state => state.form);

  if (!submittedData) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Данные формы</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <ul className="list-group">
              {Object.entries(submittedData).map(([key, value]) => (
                <li key={key} className="list-group-item">
                  <strong>{key}:</strong> {String(value)}
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={onClose}>Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFormData;
