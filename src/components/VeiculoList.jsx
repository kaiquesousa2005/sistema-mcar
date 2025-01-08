import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Importando Link para navegação instantânea
import "./VeiculoList.css";

const VeiculoList = ({ vehicles, onDeleteVeiculo }) => {
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
              <button
                className="delete-vehicle-btn"
                onClick={() => onDeleteVeiculo(vehicle.id)}
                aria-label="Deletar veículo"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              {/* Substituindo o <a> por <Link> */}
              <Link to={`/veiculo/${vehicle.id}`} className="gastos-link">
                Gastos
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VeiculoList;
