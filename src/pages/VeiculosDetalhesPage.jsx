import React, { useState, useEffect, useCallback } from "react";
import VeiculosDetails from "../components/VeiculosDetails";
import ExpenseForm from "../components/ExpenseForm";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./VeiculosDetalhesPage.css";

const VeiculosDetalhesPage = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchVehicle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, "vehicles", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const vehicleData = docSnap.data();
        setVehicle({
          id: docSnap.id,
          ...vehicleData,
          expenses: vehicleData.expenses || [], // Inicializa gastos como array vazio
        });
      } else {
        setError("Nenhum veículo encontrado!");
      }
    } catch (error) {
      setError("Erro ao buscar veículo.");
      console.error("Erro ao buscar veículo:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchVehicle();
  }, [fetchVehicle]);

  const handleAddExpense = async (newExpense) => {
    if (!vehicle) return;

    const updatedExpenses = [...vehicle.expenses, newExpense];

    try {
      const docRef = doc(db, "vehicles", vehicle.id);
      await updateDoc(docRef, { expenses: updatedExpenses });
      setVehicle({ ...vehicle, expenses: updatedExpenses });
    } catch (error) {
      console.error("Erro ao adicionar gasto:", error);
    }
  };

  const handleDeleteExpense = async (index) => {
    if (!vehicle || !vehicle.expenses) return;

    const updatedExpenses = vehicle.expenses.filter((_, i) => i !== index);

    try {
      const docRef = doc(db, "vehicles", vehicle.id);
      await updateDoc(docRef, { expenses: updatedExpenses });
      setVehicle({ ...vehicle, expenses: updatedExpenses });
    } catch (error) {
      console.error("Erro ao remover gasto:", error);
    }
  };

  if (loading) {
    return <div className="loading"></div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="vehicle-details-page">
      <main className="main-content">
        <h1>Detalhes do Veículo</h1>
        <ExpenseForm onAddExpense={handleAddExpense} />
        <VeiculosDetails vehicle={vehicle} onDeleteExpense={handleDeleteExpense} />
      </main>
    </div>
  );
};

export default VeiculosDetalhesPage;
