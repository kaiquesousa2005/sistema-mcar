import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./VeiculoList.css";

const VeiculoList = ({ vehicles, onDeleteVeiculo, onEditVeiculo }) => {
  return (
    <div className="vehicle-list">
      {vehicles.length === 0 ? (
        <p>Nenhum veículo encontrado.</p>
      ) : (
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle.id} className="vehicle-item">
              <h3>Veículo: {vehicle.name}</h3>
              <p>Placa: {vehicle.plate}</p>
              <p>Renavan: {vehicle.renavan}</p>
              <div className="vehicle-actions">
                <button
                  className="delete-vehicle-btn"
                  onClick={() => onDeleteVeiculo(vehicle.id)}
                  aria-label="Deletar veículo"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  className="edit-vehicle-btn"
                  onClick={() => onEditVeiculo(vehicle)}
                  aria-label="Editar veículo"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <Link to={`/veiculo/${vehicle.id}`} className="gastos-link">
                  Gastos
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VeiculoList;

