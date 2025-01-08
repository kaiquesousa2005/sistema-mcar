import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import VehiclePDF from "./VeiculosPDF";
import "./VeiculosDetails.css";

const VeiculosDetails = ({ vehicle, onDeleteExpense }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const groupedExpenses = useMemo(() => {
    if (!vehicle.expenses) return {};
    return vehicle.expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = {
          items: [],
          total: 0,
        };
      }
      acc[expense.category].items.push(expense);
      acc[expense.category].total += expense.amount || 0;
      return acc;
    }, {});
  }, [vehicle.expenses]);

  const calculateTotalExpenses = () => {
    return Object.values(groupedExpenses).reduce(
      (total, category) => total + category.total,
      0
    );
  };

  return (
    <div className="vehicle-details">
      <h2>{vehicle.name}</h2>
      <p>Placa: {vehicle.plate}</p>
      <p>Renavan: {vehicle.renavan}</p>
      <h3>Histórico de Gastos</h3>
      {Object.keys(groupedExpenses).length === 0 ? (
        <p>Nenhum gasto registrado.</p>
      ) : (
        <table className="expense-table">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedExpenses).map(([category, data]) => (
              <React.Fragment key={category}>
                {data.items.map((expense, index) => (
                  <tr key={`${category}-${index}`}>
                    {index === 0 && (
                      <td rowSpan={data.items.length} className="category-cell">
                        {category}
                        <div className="category-total">
                          Total: {formatCurrency(data.total)}
                        </div>
                      </td>
                    )}
                    <td>{expense.description}</td>
                    <td>{formatCurrency(expense.amount)}</td>
                    <td>
                      <button
                        className="delete-expense-btn"
                        onClick={() => onDeleteExpense(vehicle.expenses.indexOf(expense))}
                        aria-label="Deletar gasto"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
      <p className="total-expenses">
        Total de Gastos: {formatCurrency(calculateTotalExpenses())}
      </p>
      <PDFDownloadLink
        document={<VehiclePDF vehicle={vehicle} groupedExpenses={groupedExpenses} totalExpenses={calculateTotalExpenses()} />}
        fileName={`${vehicle.name}_detalhes.pdf`}
        className="download-pdf-btn"
      >
        {({ loading }) => (loading ? "Carregando PDF..." : "Baixar PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default VeiculosDetails;

