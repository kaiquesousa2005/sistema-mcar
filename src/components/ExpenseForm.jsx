import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ onAddExpense }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      category,
      amount: parseFloat(amount),
      description,
    };
    onAddExpense(newExpense);
    setCategory("");
    setAmount("");
    setDescription("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>Adicionar Gasto</h3>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Selecione a categoria</option>
        <option value="Manutenção">Manutenção</option>
        <option value="Peças">Peças</option>
        <option value="Multas">Multas</option>
        <option value="IPVA">IPVA</option>
        <option value="Outros">Outros</option>
      </select>

      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        min="0"
        step="0.01"
      />
      <button type="submit">Adicionar Gasto</button>
    </form>
  );
};

export default ExpenseForm;
